class ChartBuilder {
  constructor(axis, axisLabel, ctx) {
    this.axis = axis;
    this.axisLabel = axisLabel;
    this.ctx = ctx;

    this.config = this._getConfig();
    this._setRegionsValues();
    this.chart = new Chart(this.ctx, this.config);
  }

  _addRegion(label, values, color = 'orange') {
    const region = {
      label: label,
      backgroundColor: color,
      borderColor: color,
      data: values,
      lineTension: 0,
      fill: false,
      borderWidth: 2,
      pointRadius: 0,
    };

    this.config.data.datasets.push(region);
  }

  _setRegionsValues() {
    let i = 0;

    this.axis.regions.forEach((region) => {
      const values = [];
      this.axis.peaks.forEach((peak) => {
        values.push(region.Mu(peak));
      });

      this._addRegion(this.axis.regions[i].label, values, this._getColor());
      i++;
    });
  }

  _getColor() {
    if (!this._colors || this._colors.length == 0)
      this._colors = ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'];
    // this._colors = [
    //   'rgba(38, 70, 83, 0.3)',
    //   'rgba(42, 157, 143, 0.3)',
    //   'rgba(233, 196, 106, 0.3)',
    //   'rgba(244, 162, 97, 0.3)',
    //   'rgba(231, 111, 81, 0.3)',
    // ];

    return this._colors.splice(0, 1)[0];
  }

  _getConfig() {
    return {
      type: 'line',

      data: {
        labels: this.axis.peaks,
        datasets: [],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontSize: 14,
          },
        },
        title: {
          display: true,
          fontSize: 14,
          text: `μ(${this.axisLabel})`,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.axisLabel,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'μ',
              },
            },
          ],
        },
      },
    };
  }
}
