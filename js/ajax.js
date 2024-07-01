// ajax.js
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const contentContainer = document.getElementById('content-container');
            contentContainer.innerHTML = html;
            setTimeout(() => {
                contentContainer.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            // Actualizar la URL
            history.pushState({ path: url }, '', url);
        });
}

// Controlar cambios en el historial
window.addEventListener('popstate', (event) => {
    if (event.state) {
        loadContent(event.state.path);
    }
});

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const url = link.href;
            loadContent(url);
        });
    });
});
