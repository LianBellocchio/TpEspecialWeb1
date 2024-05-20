
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
