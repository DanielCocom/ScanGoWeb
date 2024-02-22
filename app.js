// document.addEventListener('DOMContentLoaded', function () {
//     const loginForm = document.getElementById('loginForm');

//     loginForm.addEventListener('submit', function (event) {
//         event.preventDefault(); // Evita que el formulario se envíe automáticamente

//         // Obtén los valores de usuario y contraseña del formulario
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         // Crea un objeto con los datos del formulario
//         const User = {
//             nombre: username,
//             contraseña: password // Aquí es donde estaba el error tipográfico
//         };

//         // Realiza una solicitud POST a la API para autenticar al usuario
//         fetch('https://walmart.somee.com/publish/v1/Administrador/iniciar sesion', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(User),
//             mode: 'no-cors'
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     window.location.href = 'Dashboard.html';
//                     // throw new Error('Error al iniciar sesión');

//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 // Maneja la respuesta de la API
//                 console.log(data);
//                 // Redirige al usuario a otra página, por ejemplo, la página de inicio
//                 window.location.href = 'pagina_de_inicio.html';
//             })
//             .catch(error => {
//                 // Maneja errores de la solicitud
//                 console.error('Error:', error);
//                 console.log(User)
//                 // Muestra un mensaje de error al usuario
//                 alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
//             });
//     });
// });


fetch('https://walmart.somee.com/publish/v1/Establecimiento',{
    // mode: 'no-cors'
})
    .then(response => response.json())
    .then(data => {
        const apiResponseContainer = document.getElementById('apiResponse');
        data.forEach(obj => {
            const div = document.createElement('div');
            div.innerHTML = `
                    <p>ID: ${obj.idSuper}</p>
                    <p>Nombre: ${obj.nombre}</p>
                    <p>Imagen: ${obj.imagen}</p>
                    <p>ID Inventar: ${obj.idInventar}</p>
                    <p>Dirección: ${obj.direccion}</p>
                    <p>Longitud: ${obj.longitud}</p>
                    <p>Latitud: ${obj.latitud}</p>
                    <hr>
                `;
                apiResponseContainer.appendChild(div);
            });
            // ...
            // console.log(obj)
        })
    .catch(error => console.error('Error al obtener datos de la API:', error));
