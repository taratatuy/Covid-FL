class FuzzySystem {
  constructor(countriesList) {
    this.countriesList = countriesList;
    this.N = 4; //TODO: Input
    this.x1Axis = this._getAxis('x1');
    this.x2Axis = this._getAxis('x2');
    this.yAxis = this._getAxis('y');

    this.setIntervals();
  }

  setIntervals() {
    // this.x1Axis.min = Math.min(...this.x1Axis.values);
    // this.x1Axis.max = Math.max(...this.x1Axis.values);
    // this.x1Axis.interval = this.x1Axis.max - this.x1Axis.min;

    // this.x2Axis.min = Math.min(...this.x2Axis.values);
    // this.x2Axis.max = Math.max(...this.x2Axis.values);
    // this.x2Axis.interval = this.x2Axis.max - this.x2Axis.min;

    // this.yAxis.min = Math.min(...this.yAxis.values);
    // this.yAxis.max = Math.max(...this.yAxis.values);
    // this.yAxis.interval = this.yAxis.max - this.yAxis.min;

    // this._setPeaks(this.x1Axis);
    // this._setPeaks(this.x2Axis);
    // this._setPeaks(this.yAxis);

    // this.x1Axis.funcM = this._funcionBuilder(760559, 1520749);
    // this.x1Regions = this.x1Axis.regions;

    console.log(this.x1Axis);
    console.log(this.x2Axis);
    console.log(this.yAxis);
  }

  /**
   * Get input axis from an array of countries.
   * @param {string} param - Label of the input axis: ('x1' | 'x2' | 'y').
   * @returns {Axis}
   * @private
   */
  _getAxis(param) {
    const output = [];
    this.countriesList.forEach((country) => {
      output.push(+country[param].replace(/,/g, '.'));
    });
    return new Axis(output, this.N);
  }
}
