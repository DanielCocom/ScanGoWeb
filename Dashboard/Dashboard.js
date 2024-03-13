
document.addEventListener('DOMContentLoaded', function () {
    // Hacer una solicitud a la API para obtener los establecimientos
    fetch('https://walmart.somee.com/publish/v1/Establecimiento')
        .then(response => response.json())
        .then(establecimientos => {
            // Obtener el contenedor de establecimientos
            var establecimientosContainer = document.getElementById('establecimientosContainer');
            

            // Limpiar el contenedor de establecimientos
            establecimientosContainer.innerHTML = '';

            // Iterar sobre los establecimientos y crear un elemento para cada uno
            establecimientos.forEach(establecimiento => {
                // Crear un div para el establecimiento
                var establecimientoDiv = document.createElement('div');
                establecimientoDiv.className = 'box';

                // Agregar la imagen del establecimiento
                var imagen = document.createElement('img');
                imagen.src = establecimiento.imagen;
                imagen.alt = establecimiento.nombre;
                imagen.className = 'img-fluid';
                establecimientoDiv.appendChild(imagen);

                // Agregar el nombre del establecimiento
                var nombre = document.createElement('p');
                nombre.className = 'mt-2';
                nombre.textContent = establecimiento.nombre;
                establecimientoDiv.appendChild(nombre);

                // Agregar el formulario de inventario
                var formulario = document.createElement('form');
                formulario.action = '/Productos/Prodcuctos.html';
                var boton = document.createElement('button');
                boton.type = 'submit';
                boton.className = 'btn btn-outline-info';
                boton.textContent = 'Inventario';
                formulario.appendChild(boton);
                establecimientoDiv.appendChild(formulario);

                // Agregar el ID del establecimiento como atributo de datos al formulario
                formulario.dataset.establecimientoId = establecimiento.idSuper;

                // Agregar el controlador de eventos para el botón de inventario
                boton.addEventListener('click', function (event) {
                    // Evitar que el formulario se envíe automáticamente
                    event.preventDefault();

                    // Obtener el ID del establecimiento desde el atributo de datos
                    var establecimientoId = this.parentNode.dataset.establecimientoId;

                    // Redirigir a la página de productos con el ID del establecimiento en la URL
                    window.location.href = `/Productos/Prodcuctos.html?idSuper=${establecimientoId}`;
                });

                // Agregar el div del establecimiento al contenedor
                establecimientosContainer.appendChild(establecimientoDiv);
            });
        })
        .catch(error => {
            console.error('Error al obtener establecimientos:', error);
        });
});

