document.addEventListener('DOMContentLoaded', function () {
    // Generar y mostrar el captcha
    var captchaText = generateCaptcha();
    document.getElementById('captchaText').textContent = captchaText;

    // Mostrar u ocultar menú en versión móvil
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('nav ul.menu');
    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('show');
    });

    // Validación del formulario de contacto
    var contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var captchaInput = document.getElementById('captcha').value;
        var captchaResult = document.getElementById('captchaResult'); // Elemento para mostrar resultado

        if (captchaInput !== captchaText) {
            captchaResult.textContent = 'El captcha ingresado es incorrecto'; // Mostrar resultado
        } else {
            captchaResult.textContent = '¡Formulario enviado correctamente!'; // Mostrar resultado
            contactForm.reset();
        }
    });
});

// Función para generar el captcha
function generateCaptcha() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var captcha = '';
    for (var i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}
