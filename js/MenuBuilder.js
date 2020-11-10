class MenuBuilder {
  constructor(countriesList, invalidDataLines, fuzzySystem) {
    this.fuzzySystem = fuzzySystem;
    this.countriesList = countriesList;
    this.invalidDataLines = invalidDataLines;
    this.countriesListEl = document.querySelector('.countries-list');
    this.invalidDataLinesEl = document.querySelector('.invalid-countries');
    this.displayCountries();
    this.buildChart('x1-chart', 'x1-wrapper', fuzzySystem.x1Axis, 'X1');
    this.buildChart('x2-chart', 'x2-wrapper', fuzzySystem.x2Axis, 'X2');
    this.buildChart('y1-chart', 'y-wrapper', fuzzySystem.yAxis, 'Y');
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
    try {
      x1 = +x1.toFixed(4);
      x2 = +x2.toFixed(4);
      y = +y.toFixed(4);
    } catch {}

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

  buildChart(canvasID, wrapperClass, axis, axisLabel) {
    let canvas = document.getElementById(canvasID);
    if (canvas) canvas.remove();

    canvas = document.createElement('canvas');
    canvas.id = canvasID;
    canvas.height = '300';

    document.querySelector('.' + wrapperClass).appendChild(canvas);

    const ctx = canvas.getContext('2d');
    this.chatBuilder = new ChartBuilder(axis, axisLabel, ctx);
  }
}
