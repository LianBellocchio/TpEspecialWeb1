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

// API endpoint y configuración de paginación
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

// Renderizar los datos en la tabla con paginación
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
            </td>
        `;
        tableBody.appendChild(row);
    });
    updatePaginationButtons(data.length, page);
}

// Actualizar los botones de paginación
function updatePaginationButtons(totalItems, page) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    document.getElementById('current-page').textContent = page;
    document.getElementById('prev-page').disabled = page === 1;
    document.getElementById('next-page').disabled = page === totalPages;
}

// Agregar evento de click a la tabla para editar o borrar filas
document.getElementById('tabla').addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
        const id = event.target.dataset.id;
        populateEditForm(id);
    } else if (event.target.classList.contains('delete-button')) {
        const id = event.target.dataset.id;
        deleteDataFromTable(id);
    }
});

// Agregar datos a la tabla
function addDataToTable(e) {
    e.preventDefault();
    const artista = document.getElementById('artista-input').value;
    const album = document.getElementById('album-input').value;
    const year = document.getElementById('year-input').value;
    const errorMessage = document.getElementById('error-message');

    const json = {
        artista,
        album,
        year
    };
    if (artista && album && year) {
        fetch(`${apikey}spotify/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
            .then(response => response.json())
            .then(data => {
                loadTableData(currentPage);
                document.getElementById('add-form').reset();
                errorMessage.style.display = 'none';
            });
    } else {
        errorMessage.textContent = 'Por favor, rellene todos los campos';
        errorMessage.style.display = 'block';
    }
}

// Borrar datos de la tabla
function deleteDataFromTable(id) {
    fetch(`${apikey}spotify/data/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        loadTableData(currentPage);
    });
}

// Poblar el formulario de edición con los datos de la fila seleccionada
function populateEditForm(id) {
    fetch(`${apikey}spotify/data/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('artista-input').value = data.artista;
            document.getElementById('album-input').value = data.album;
            document.getElementById('year-input').value = data.year;
            document.getElementById('save-button').dataset.id = id;

            // Deshabilitar el botón "Agregar canción" y mostrar solo el botón "Guardar cambios"
            document.getElementById('add-button').disabled = true;
            document.getElementById('save-button').style.display = 'inline-block';
        });
}

// Editar datos en la tabla
function editDataInTable(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const artista = document.getElementById('artista-input').value;
    const album = document.getElementById('album-input').value;
    const year = document.getElementById('year-input').value;
    const errorMessage = document.getElementById('error-message');

    const json = { artista, album, year };
    if (artista && album && year) {
        fetch(`${apikey}spotify/data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(response => response.json())
        .then(() => {
            loadTableData(currentPage);
            document.getElementById('add-form').reset();
            document.getElementById('save-button').removeAttribute('data-id');
    
            // Habilitar el botón "Agregar canción" y ocultar el botón "Guardar cambios"
            document.getElementById('add-button').disabled = false;
            document.getElementById('save-button').style.display = 'none';
            errorMessage.style.display = 'none';
        });
    }
    else {
        errorMessage.textContent = 'Por favor, rellene todos los campos';
        errorMessage.style.display = 'block';
    }

}

// Crear múltiples ítems
function createMultipleItems(e) {
    e.preventDefault();
    const numItemsInput = document.getElementById('num-items-input');
    const numItems = parseInt(numItemsInput.value);
    const errorMessage = document.getElementById('error-message');

    if (numItems > 0 && numItems<10) {
        for (let i = 0; i < numItems; i++) {
            const json = {
                artista: `Artista ${i + 1}`,
                album: `Álbum ${i + 1}`,
                year: `202${i + 1}`
            };

            fetch(`${apikey}spotify/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            })
            .then(response => response.json())
            .then(data => {
                if (i === numItems - 1) {
                    loadTableData(currentPage);
                    numItemsInput.value = '';
                    errorMessage.style.display = 'none';
                }
            });
        }
    } else{
        errorMessage.textContent = 'Por favor, ingrese un número entre 1 y 9';
        errorMessage.style.display = 'block';
    }
}

// Filtrar datos en la tabla
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
document.getElementById('prev-page').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        loadTableData(currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', function () {
    currentPage++;
    loadTableData(currentPage);
});

// Eventos
document.getElementById('add-button').addEventListener('click', addDataToTable);
document.getElementById('create-multiple-button').addEventListener('click', createMultipleItems);
document.getElementById('filter-input').addEventListener('input', filterTableData);
document.getElementById('filter-select').addEventListener('change', filterTableData);
document.getElementById('save-button').addEventListener('click', editDataInTable);

document.addEventListener('DOMContentLoaded', () => {
    loadTableData(currentPage);
});
