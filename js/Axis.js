class Axis {
  /**
   *
   * @param {Array<number>} values
   * @param {number} N - Number of regions between start and center.
   */
  constructor(values, N) {
    this.values = values;
    this.N = N;
    this.min = Math.min(...values);
    this.max = Math.max(...values);
    this.interval = +(this.max - this.min).toFixed(6);
    this.peaks = this._getPeaks();
    this.regions = this._getRegionFunctions();
    // this.funcM = this._funcionBuilder(760559, 1520749);
  }

  /**
   * Split the interval betveen min and max axis values into regions.
   * Returns an array of numbers with equal distance between each.
   * @returns {Array<number>} - Peaks of the regions
   * @private
   */
  _getPeaks() {
    const peaks = [];
    const step = +(this.interval / (2 * this.N)).toFixed(6);
    for (
      let i = this.min;
      +i.toFixed(6) < +(this.max + step).toFixed(6);
      i += step
    ) {
      peaks.push(+i.toFixed(6));
    }
    return peaks;
  }

  _getRegionFunctions() {
    const regionFuncs = [];

    regionFuncs.push(
      this._funcionBuilder(
        this.peaks[0] - (this.peaks[1] - this.peaks[0]),
        this.peaks[0],
        'start'
      )
    );
    regionFuncs.push(
      this._funcionBuilder(
        this.peaks[this.peaks.length - 2],
        this.peaks[this.peaks.length - 1],
        'end'
      )
    );

    for (let i = 0; i < this.peaks.length - 2; i++) {
      regionFuncs.push(this._funcionBuilder(this.peaks[i], this.peaks[i + 1]));
    }

    return regionFuncs;
  }

  /**
   * Returns region's function.
   * @param {number} start - Growing point.
   * @param {number} peak - Peak point. The center of function.
   * @returns {function}
   * @private
   */
  _funcionBuilder(start, peak, position = 'center') {
    return function (x) {
      let A = 0;
      let B = 0;
      if (x - peak > 0) {
        if (position == 'end') {
          return 1;
        }

        A = 1 / (peak - start);
        B = -start / (peak - start);
      } else {
        if (position == 'start') {
          return 1;
        }

        A = 1 / (start - peak);
        B = -peak / (start - peak) + 1;
      }

      const y = A * x + B;
      if (y >= 0 && y <= 1) return y;
      return 0;
    };
  }
}
