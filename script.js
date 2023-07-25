document.addEventListener('DOMContentLoaded', function() {
  const tableHeader = document.getElementById('table-header');
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

  // Función para mostrar el enlace de la lista oficial de continentes o países
  function showInfoLink() {
    const sumRange = sumRangeSelect.value;
    const name = countryOrContinentInput.value;
    let link = '';

    if (sumRange === 'continental') {
      link = `<a href="https://www.worldcubeassociation.org/regions/" target="_blank">Lista de Continentes</a>`;
    } else if (sumRange === 'pais') {
      link = `<a href="https://www.worldcubeassociation.org/countries/" target="_blank">Lista de Países</a>`;
    }

    infoLink.innerHTML = link;
  }

  // Función para mostrar los datos en la tabla con encabezados y columnas dinámicas
  function displayTableData(data) {
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    const sumType = sumTypeSelect.value;
    const filteredData = data.filter(row => row['Tipo'] === sumType).slice(0, 100);

    // Obtener los encabezados de la tabla a partir de las claves del primer objeto del arreglo
    const headers = Object.keys(filteredData[0]);

    // Crear los encabezados de la tabla
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    // Crear las filas de la tabla con los datos
    filteredData.forEach(row => {
      const newRow = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = row[header];
        newRow.appendChild(td);
      });
      tableBody.appendChild(newRow);
    });
  }

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
