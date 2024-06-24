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
var currentPage = 1;
var itemsPerPage = 5;

// Función para cargar datos de la tabla con paginación
function loadTableData(page) {
    fetch(`${apikey}spotify/data`)
        .then(response => response.json())
        .then(data => {
            renderTableData(data, page);
        });
}

function renderTableData(data, page) {
    const tableBody = document.getElementById('tabla-body');
    tableBody.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = data.slice(start, end);

    paginatedItems.forEach(item => {
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

    updatePaginationButtons(data.length, page);
}

function updatePaginationButtons(totalItems, page) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    document.getElementById('current-page').textContent = page;
    document.getElementById('prev-page').disabled = page === 1;
    document.getElementById('next-page').disabled = page === totalPages;
}

document.getElementById('tabla').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button')) {
        const id = event.target.dataset.id;
        editDataInTable(id);
    } else if (event.target.classList.contains('delete-button')) {
        const id = event.target.dataset.id;
        deleteDataFromTable(id);
    }
});

function addDataToTable(e) {
    e.preventDefault();
    const artista = document.getElementById('artista-input').value;
    const album = document.getElementById('album-input').value;
    const year = document.getElementById('year-input').value;
    
    const formData = new FormData();
    formData.append('artista', artista);
    formData.append('album', album);
    formData.append('year', year);
    
    fetch(`${apikey}spotify/data`, {
        method: 'POST',
        body: formData
    }).then(response => response.json())
    .then(data => {
        loadTableData(currentPage);
        document.getElementById('add-form').reset();
    });
}

function deleteDataFromTable(id) {
    fetch(`${apikey}spotify/data/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(() => {
        loadTableData(currentPage);
    });
}

function editDataInTable(id) {
    const artista = prompt("Ingrese nuevo nombre del artista:");
    const album = prompt("Ingrese nuevo nombre del álbum:");
    const year = prompt("Ingrese nuevo año:");

    if (artista && album && year) {
        const formData = new FormData();
        formData.append('artista', artista);
        formData.append('album', album);
        formData.append('year', year);

        fetch(`${apikey}spotify/data/${id}`, {
            method: 'PUT',
            body: formData
        }).then(response => response.json())
        .then(() => {
            loadTableData(currentPage);
        });
    }
}

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
            loadTableData(currentPage);
        });
    }
}

function filterTableData() {
    const filterInput = document.getElementById('filter-input').value.toLowerCase();
    const filterSelect = document.getElementById('filter-select').value;
    fetch(`${apikey}spotify/data`)
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => {
                return (
                    (!filterInput || item.artista.toLowerCase().includes(filterInput)) &&
                    (!filterSelect || item.year === filterSelect)
                );
            });
            renderTableData(filteredData, currentPage);
        });
}

// Paginación
document.getElementById('prev-page').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        loadTableData(currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', function() {
    currentPage++;
    loadTableData(currentPage);
});

// Eventos
document.getElementById('add-button').addEventListener('click', addDataToTable);
document.getElementById('create-multiple-button').addEventListener('click', createMultipleItems);
document.getElementById('filter-input').addEventListener('input', filterTableData);
document.getElementById('filter-select').addEventListener('change', filterTableData);
document.addEventListener('DOMContentLoaded', () => {
    loadTableData(currentPage);
});
