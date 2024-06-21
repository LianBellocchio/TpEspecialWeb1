
// Mostrar u ocultar menú en versión móvil
var menuToggle = document.querySelector('.menu-toggle');
var menu = document.querySelector('nav ul.menu');
menuToggle.addEventListener('click', function () {
    menu.classList.toggle('show');
});


// Funcionalidad de cambio de modo claro/oscuro
var themeToggle = document.getElementById('theme-toggle');
var themeIcon = document.getElementById('theme-icon');
var isDarkMode = false;
themeToggle.addEventListener('click', function () {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeIcon.src = isDarkMode ? 'assets/moon.png' : 'assets/sun.png';
    themeIcon.alt = isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
});

var apikey = "https://66732baf6ca902ae11b3591b.mockapi.io/api/v1/";

// Función para cargar datos de la tabla
function loadTableData(e) {
    e.preventDefault();
    fetch(`${apikey}spotify/data`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tabla-body');
            tableBody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.artista}</td>
                    <td>${item.album}</td>
                    <td>${item.year}</td>
                    <td>
                        <button class="edit-button" data-id="${item.id}">Editar</button>
                        <button class="delete-button" data-id="${item.id}">Borrar</button>
                    </td>`;
                tableBody.appendChild(row);
            });
        });
}

// Mostrar u ocultar menú en versión móvil
var menuToggle = document.querySelector('.menu-toggle');
var menu = document.querySelector('nav ul.menu');
menuToggle.addEventListener('click', function() {
    menu.classList.toggle('show');
});

// Funcionalidad de cambio de modo claro/oscuro
var themeToggle = document.getElementById('theme-toggle');
var themeIcon = document.getElementById('theme-icon');
var isDarkMode = false;
themeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeIcon.src = isDarkMode ? 'assets/moon.png' : 'assets/sun.png';
    themeIcon.alt = isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
});

var apikey = "https://66732baf6ca902ae11b3591b.mockapi.io/api/v1/";

// Función para cargar datos de la tabla
function loadTableData() {
    fetch(`${apikey}spotify/data`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tabla-body');
            tableBody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.artista}</td>
                    <td>${item.album}</td>
                    <td>${item.year}</td>
                    <td>
                        <button class="edit-button" data-id="${item.id}">Editar</button>
                        <button class="delete-button" data-id="${item.id}">Borrar</button>
                    </td>`;
                tableBody.appendChild(row);
            });
        });
}

// Agregar evento a la tabla para capturar clics en los botones dinámicos
document.getElementById('tabla').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        const id = event.target.dataset.id;
        editDataInTable(id);
    } else if (event.target.classList.contains('delete-button')) {
        const id = event.target.dataset.id;
        deleteDataFromTable(id);
    }
});

// Función para agregar datos a la tabla
function addDataToTable(e) {
    e.preventDefault();
    const formData = new FormData(document.getElementById('add-form'));
    fetch(`${apikey}spotify/data`, {
        method: 'POST',
        body: formData
    }).then(response => response.json())
    .then(data => {
        loadTableData();
    });
}

// Función para eliminar datos de la tabla
function deleteDataFromTable(id) {
    fetch(`${apikey}spotify/data/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(() => {
        loadTableData();
    });
}

// Función para editar datos de la tabla
function editDataInTable(id) {
    const formData = new FormData(document.getElementById(`edit-form-${id}`));
    fetch(`${apikey}spotify/data/${id}`, {
        method: 'PATCH',
        body: formData
    }).then(response => response.json())
    .then(() => {
        loadTableData();
    });
}

// Función para crear varios ítems automáticamente
function createMultipleItems(e) {
    e.preventDefault();
    const numItems = 3;
    for (let i = 0; i < numItems; i++) {
        const formData = new FormData();
        formData.append('artista', `Artista${i + 1}`);
        formData.append('album', `Álbum${i + 1}`);
        formData.append('year', `202${i + 1}`);
        fetch(`${apikey}spotify/data`, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => {
            loadTableData();
        });
    }
}

// Función para filtrar datos en la tabla
function filterTableData(e) {
    e.preventDefault();
    const filterInput = document.getElementById('filter-input').value;
    const filterSelect = document.getElementById('filter-select').value;
    const tableRows = document.getElementById('tabla-body').rows;
    for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const artista = row.cells[0].textContent;
        const year = row.cells[2].textContent;
        if ((filterInput && artista.toLowerCase().indexOf(filterInput.toLowerCase()) === -1) || 
            (filterSelect && year !== filterSelect)) {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    }
}

// Eventos
document.getElementById('add-button').addEventListener('click', addDataToTable);
document.getElementById('create-multiple-button').addEventListener('click', createMultipleItems);
document.getElementById('filter-input').addEventListener('input', filterTableData);
document.getElementById('filter-select').addEventListener('change', filterTableData);
document.addEventListener('DOMContentLoaded', () => {
    loadTableData();
});
