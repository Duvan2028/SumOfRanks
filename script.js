document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById('table-body');
  const sumTypeSelect = document.getElementById('sum-type');
  const sumRangeSelect = document.getElementById('sum-range');
  const countryOrContinentInput = document.getElementById('country-or-continent');
  const infoLink = document.getElementById('info-link');

  // Ruta de tu archivo CSV con datos de sum of ranks (puedes tener diferentes rutas para cada tipo y nivel)
  const csvFileURL = 'URL_DEL_ARCHIVO_CSV';

  // Función para cargar los datos CSV
  function loadCSVData(url) {
    Papa.parse(url, {
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
      link = `<a href="https://www.worldcubeassociation.org/wfc/country-bands" target="_blank">Lista de Continentes</a>`;
    } else if (sumRange === 'pais') {
      link = `<a href="https://www.worldcubeassociation.org/regulations/countries/" target="_blank">Lista de Países</a>`;
    }

    infoLink.innerHTML = link;
  }

  // Función para mostrar los datos en la tabla con encabezados y columnas dinámicas
  function displayTableData(data) {
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
    tableBody.appendChild(headerRow);

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

  // Cargar datos al cargar la página y cuando se cambia el tipo de sum of ranks o rango
  loadCSVData(csvFileURL);
  sumTypeSelect.addEventListener('change', function() {
    loadCSVData(csvFileURL);
  });
  sumRangeSelect.addEventListener('change', function() {
    loadCSVData(csvFileURL);
    showInfoLink();
  });
  countryOrContinentInput.addEventListener('input', function() {
    loadCSVData(csvFileURL);
    showInfoLink();
  });
});
        
