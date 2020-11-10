class FuzzySystem {
  constructor(countriesList) {
    this.countriesList = countriesList;
    this.N = 2; //TODO: Input
    this.x1Axis = this._getAxis('x1');
    this.x2Axis = this._getAxis('x2');
    this.yAxis = this._getAxis('y');
    this.rulesList = this._getRulesList();
    console.log(this.rulesList);
    this.rulesBase = this._getRulesBase();
    console.log(this.rulesBase);
  }

  _getRulesBase() {
    const rulesBase = {};

    this.rulesList.forEach((r) => {
      rulesBase[r.x1.label] = rulesBase[r.x1.label] || {};
      rulesBase[r.x1.label][r.x2.label] = rulesBase[r.x1.label][r.x2.label] || {
        label: '',
        sp: 0,
      };

      if (rulesBase[r.x1.label][r.x2.label].sp < r.sp) {
        rulesBase[r.x1.label][r.x2.label].label = r.y.label;
        rulesBase[r.x1.label][r.x2.label].sp = r.sp;
        rulesBase[r.x1.label][r.x2.label].rule = r;
      }
    });

    return rulesBase;
  }

  _getRulesList() {
    const rulesList = [];
    for (let i = 0; i < this.x1Axis.baseData.length; i++) {
      rulesList.push({
        number: i,
        x1: this.x1Axis.baseData[i],
        x2: this.x2Axis.baseData[i],
        y: this.yAxis.baseData[i],
        sp:
          this.x1Axis.baseData[i].yValue *
          this.x2Axis.baseData[i].yValue *
          this.yAxis.baseData[i].yValue,
      });
    }

    return rulesList;
  }

  /**
   * Get axis from an array of countries.
   * @param {string} param - Label of the input axis: ('x1' | 'x2' | 'y').
   * @returns {Axis}
   * @private
   */
  _getAxis(param) {
    const output = [];
    this.countriesList.forEach((country) => {
      output.push(+`${country[param]}`.replace(/,/g, '.'));
    });
    return new Axis(output, this.N);
  }
}
