class ChartBuilder {
  constructor(axis, axisName, ctx) {
    this.axis = axis;
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
    this.axis.regions.forEach((region) => {
      const values = [];
      this.axis.peaks.forEach((peak) => {
        values.push(region(peak));
      });
      this._addRegion('x', values, this._getColor());
    });
  }

  _getColor() {
    if (!this._colors || this._colors.length == 0)
      this._colors = ['#264653', '#F4A261', '#2A9D8F', '#E9C46A', '#E76F51'];

    return this._colors.splice(0, 1);
  }

  _getConfig() {
    return {
      type: 'line',

      data: {
        labels: this.axis.peaks,
        datasets: [
          // {
          //   label: 'Interpolation',
          //   // backgroundColor: 'orange',
          //   // borderColor: 'orange',
          //   data: [1, 2, 1, 2],
          //   lineTension: 0,
          //   fill: false,
          //   borderWidth: 2,
          //   pointRadius: 0,
          // },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontSize: 16,
          },
        },
        title: {
          display: true,
          fontSize: 16,
          text: '(Axis name: X1 | X2 | Y)',
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
                labelString: '(Axis name: X1 | X2 | Y)',
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'M',
              },
            },
          ],
        },
      },
    };
  }
}
