document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var username = document.getElementById('userName').value;
  var password = document.getElementById('password').value;

  // Validación de entrada
  if (!username || !password) {
      displayModal('Por favor, ingresa tanto el nombre de usuario como la contraseña.');
      return;
  }

  axios.post('https://walmart.somee.com/publish/v1/Administrador/IniciarSesion', {
    nombre: username,
    contraseña: password
  })
  .then(function (response) {
      alert("Sesión iniciada");
      window.location.href = '/Dashboard/Dashboard.html';
  })
  .catch(function (error) {
      // Gestión de errores
      if (error.response && error.response.status === 401) {
          displayModal('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      } else {
          displayModal('Error de inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
      }
  });
});

function displayModal(message) {
  // Crear el código HTML del modal
  var modalHTML = `
      <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content bg-custom">
            <div class="modal-header text-danger">
              <h5 class="modal-title" id="errorModalLabel">Error</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
  `;

  // Agregar el modal al final del cuerpo del documento
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Mostrar el modal
  var errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  errorModal.show();
}

