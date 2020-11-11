function handleFile(e) {
  var files = e.target.files,
    f = files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, { type: 'array' });

    [main.countriesList, main.invalidDataLines] = new Worksheet(
      workbook
    ).getSuitCountries();

    main.init();
  };
  reader.readAsArrayBuffer(f);
}

const main = {
  N: 2,
  init() {
    const fuzzySystem = new FuzzySystem(this.countriesList, this.N);
    new MenuBuilder(this.countriesList, this.invalidDataLines, fuzzySystem);
  },
};

document
  .querySelector('.input_xls')
  .addEventListener('change', handleFile, false);
