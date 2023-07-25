document.addEventListener('DOMContentLoaded', function() {
  const tipoSumOfRanksSelect = document.getElementById('tipo-sumofranks');
  const tablaContainer = document.getElementById('tabla-container');

  tipoSumOfRanksSelect.addEventListener('change', function() {
    const tipoSumOfRanks = tipoSumOfRanksSelect.value;
    cargarTabla(tipoSumOfRanks);
  });

  function cargarTabla(tipoSumOfRanks) {
    const url = `data/${tipoSumOfRanks}.json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tabla = crearTabla(data);
        tablaContainer.innerHTML = '';
        tablaContainer.appendChild(tabla);
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  }

  function crearTabla(data) {
    const tabla = document.createElement('table');
    const cabecera = document.createElement('tr');
    const headers = ['Posición', 'Competidor', 'Sum of Ranks'];

    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      cabecera.appendChild(th);
    });

    tabla.appendChild(cabecera);

    for (let i = 0; i < 100; i++) {
      const fila = document.createElement('tr');
      const celdas = [i + 1, data[i].competidor, data[i].sum_of_ranks];

      celdas.forEach(celdaText => {
        const td = document.createElement('td');
        td.textContent = celdaText;
        fila.appendChild(td);
      });

      tabla.appendChild(fila);
    }

    return tabla;
  }

  // Cargar la tabla inicial
  cargarTabla(tipoSumOfRanksSelect.value);
});
