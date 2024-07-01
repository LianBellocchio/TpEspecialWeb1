document.addEventListener('DOMContentLoaded', function () {
    // Generar y mostrar el captcha
    const captchaText = generateCaptcha();
    document.getElementById('captchaText').textContent = captchaText;
    // Validación del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const captchaInput = document.getElementById('captcha').value;
        const captchaResult = document.getElementById('captchaResult'); // Elemento para mostrar resultado

        if (captchaInput !== captchaText) {
            captchaResult.textContent = 'El captcha ingresado es incorrecto'; // Mostrar resultado
        } else {
            captchaResult.textContent = '¡Formulario enviado correctamente!'; // Mostrar resultado
            contactForm.reset();
        }
    });

    // Función para generar el captcha
    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    }
});