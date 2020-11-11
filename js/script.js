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
  init: function () {
    main.fuzzySystem = new FuzzySystem(main.countriesList);
    new MenuBuilder(
      main.countriesList,
      main.invalidDataLines,
      main.fuzzySystem
    );
  },
};

document
  .querySelector('.input_xls')
  .addEventListener('change', handleFile, false);
