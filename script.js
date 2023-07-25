document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById('table-body');
  const sumTypeSelect = document.getElementById('sum-type');

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

  // Función para mostrar los datos en la tabla
  function displayTableData(data) {
    tableBody.innerHTML = '';
    const sumType = sumTypeSelect.value;
    const filteredData = data.filter(row => row['Tipo'] === sumType).slice(0, 100);

    filteredData.forEach(row => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${row['Posicion']}</td>
        <td>${row['Competidor']}</td>
        <!-- Agrega más columnas según tus datos -->
      `;
      tableBody.appendChild(newRow);
    });
  }

  // Cargar datos al cargar la página y cuando se cambia el tipo de sum of ranks
  loadCSVData(csvFileURL);
  sumTypeSelect.addEventListener('change', function() {
    loadCSVData(csvFileURL);
  });
});
