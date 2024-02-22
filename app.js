document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Obtén los valores de usuario y contraseña del formulario
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Crea un objeto con los datos del formulario
        const User = {
            nombre: username,
            contraseña: password // Aquí es donde estaba el error tipográfico
        };

        // Realiza una solicitud POST a la API para autenticar al usuario
        fetch('https://walmart.somee.com/publish/v1/Administrador/iniciar sesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(User),
            mode: 'no-cors'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
            return response.json();
        })
        .then(data => {
            // Maneja la respuesta de la API
            console.log(data);
            // Redirige al usuario a otra página, por ejemplo, la página de inicio
            window.location.href = 'pagina_de_inicio.html';
        })
        .catch(error => {
            // Maneja errores de la solicitud
            console.error('Error:', error);
            console.log(User)
            // Muestra un mensaje de error al usuario
            alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
        });
    });
});
