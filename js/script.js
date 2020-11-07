function handleFile(e) {
  var files = e.target.files,
    f = files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, { type: 'array' });

    const [countriesList, invalidDataLines] = new Worksheet(
      workbook
    ).getSuitCountries();

    const fuzzySystem = new FuzzySystem(countriesList);
    const Menu = new MenuBuilder(countriesList, invalidDataLines, fuzzySystem);
  };
  reader.readAsArrayBuffer(f);
}

document
  .querySelector('.input_xls')
  .addEventListener('change', handleFile, false);
