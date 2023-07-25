document.addEventListener('DOMContentLoaded', function() {
  const tableHeader = document.getElementById('table-header');
  const tableBody = document.getElementById('table-body');
  const sumTypeSelect = document.getElementById('sum-type');
  const sumRangeSelect = document.getElementById('sum-range');

  // Función para cargar los datos CSV seleccionados por el usuario
  function loadSelectedCSV() {
    const sumType = sumTypeSelect.value;
    const sumRange = sumRangeSelect.value;
    const csvFilePath = `data/SOR/${sumType.toUpperCase()}/CONTINENTAL/SOR_${sumRange}.csv`;
    
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: function(results) {
        const data = results.data;
        displayTableData(data);
      }
    });
  }

  // Función para mostrar los datos en la tabla con encabezados y columnas dinámicas
  function displayTableData(data) {
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    // Obtener los encabezados de la tabla a partir de las claves del primer objeto del arreglo
    const headers = Object.keys(data[0]);

    // Crear los encabezados de la tabla
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    // Crear las filas de la tabla con los datos
    data.forEach(row => {
      const newRow = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = row[header];
        newRow.appendChild(td);
      });
      tableBody.appendChild(newRow);
    });
  }

  // Cargar datos al cargar la página y cuando se cambia el tipo de sum of ranks o el continente
  loadSelectedCSV();
  sumTypeSelect.addEventListener('change', function() {
    loadSelectedCSV();
  });
  sumRangeSelect.addEventListener('change', function() {
    loadSelectedCSV();
  });
});
