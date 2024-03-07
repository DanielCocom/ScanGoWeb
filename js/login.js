// login.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('userName').value;
    var password = document.getElementById('password').value;

    axios.post('https://walmart.somee.com/publish/v1/Administrador/IniciarSesion', {
      nombre: username,
      contraseña: password
    })
    .then(function (response) {
        alert("Sesion iniciada")
      window.location.href = 'Dashboard.html';
    })
    .catch(function (error) {
      alert('Error de inicio de sesión:');
    });
});
