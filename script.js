document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById('table-body');
  const sumTypeSelect = document.getElementById('sum-type');
  const sumRangeSelect = document.getElementById('sum-range');
  const countryOrContinentInput = document.getElementById('country-or-continent');
  const infoLink = document.getElementById('info-link');
  const csvFileSelect = document.getElementById('csv-file');

  // Función para cargar los datos CSV seleccionados por el usuario
  function loadSelectedCSV() {
    const selectedCSV = csvFileSelect.value;
    Papa.parse(selectedCSV, {
      download: true,
      header: true,
      complete: function(results) {
        const data = results.data;
        displayTableData(data);
      }
    });
  }

  // Resto del código JavaScript (displayTableData, showInfoLink, etc.)

  // Cargar datos al cargar la página y cuando se cambia el tipo de sum of ranks, rango o archivo CSV
  loadSelectedCSV();
  sumTypeSelect.addEventListener('change', function() {
    loadSelectedCSV();
  });
  sumRangeSelect.addEventListener('change', function() {
    loadSelectedCSV();
    showInfoLink();
  });
  countryOrContinentInput.addEventListener('input', function() {
    loadSelectedCSV();
    showInfoLink();
  });
  csvFileSelect.addEventListener('change', function() {
    loadSelectedCSV();
  });
});
