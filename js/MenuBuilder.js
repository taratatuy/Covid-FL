class MenuBuilder {
  constructor(countriesList, invalidDataLines, fuzzySystem) {
    this.fuzzySystem = fuzzySystem;
    this.countriesList = countriesList;
    this.invalidDataLines = invalidDataLines;
    this.countriesListEl = document.querySelector('.countries-list');
    this.invalidDataLinesEl = document.querySelector('.invalid-countries');
    this.displayCountries();
    this.buildCharts();
  }

  displayCountries() {
    this.countriesListEl.innerHTML = '';

    this._addLine('', 'Name', 'X1', 'X2', 'Y', true);

    let i = 0;
    this.countriesList.forEach((country) => {
      i++;
      this._addLine(`${i}.`, country.name, country.x1, country.x2, country.y);
    });
    this.invalidDataLinesEl.innerText = `Invalid data lines: ${this.invalidDataLines}`;
  }

  _addLine(i, name, x1, x2, y, bold = false) {
    const counter = this._getCountryElRows(`${i}`, 'row1 bold');
    this.countriesListEl.append(counter);
    const countryName = this._getCountryElRows(
      name,
      bold ? 'row2 bold' : 'row2'
    );
    this.countriesListEl.append(countryName);
    const countryX1 = this._getCountryElRows(x1, bold ? 'row3 bold' : 'row3');
    this.countriesListEl.append(countryX1);
    const countryX2 = this._getCountryElRows(x2, bold ? 'row4 bold' : 'row4');
    this.countriesListEl.append(countryX2);
    const countryY = this._getCountryElRows(y, bold ? 'row5 bold' : 'row5');
    this.countriesListEl.append(countryY);
  }

  _getCountryElRows(innerText, className) {
    const div = document.createElement('div');
    div.className = className;
    div.innerText = innerText;
    return div;
  }

  buildCharts() {
    let canvasX1 = document.getElementById('x1-chart');
    if (canvasX1) canvasX1.remove();

    canvasX1 = document.createElement('canvas');
    canvasX1.id = 'x1-chart';
    canvasX1.height = '240';

    document.querySelector('.x1-wrapper').appendChild(canvasX1);

    const ctx = canvasX1.getContext('2d');
    this.chatBuilder = new ChartBuilder(this.fuzzySystem.x1Axis, '', ctx);
  }
}
