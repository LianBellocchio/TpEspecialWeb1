// ajax.js
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const contentContainer = document.getElementById('content-container');
            contentContainer.innerHTML = html;
            // scrolledIntoView para ir al contenido generado
            setTimeout(() => {
                contentContainer.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
}

// eventos
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