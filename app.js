    var userName = document.getElementById("nombreUsuario")

console.log(userName)


document.addEventListener('DOMContentLoaded', function () {
    // Obtener el ID del establecimiento de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const establecimientoId = urlParams.get('idSuper');

    // Hacer una solicitud a la API para obtener los productos del establecimiento
    fetch(`https://walmart.somee.com/publish/v1/Establecimiento/Inventario?idEstablecimiento=${establecimientoId}`)
        .then(response => response.json())
        .then(productos => {
            // Obtener el contenedor de productos
            var productosContainer = document.querySelector('.productos-container .row');

            // Limpiar el contenedor de productos
            productosContainer.innerHTML = '';

            // Iterar sobre los productos y crear un elemento para cada uno
            productos.forEach(producto => {
                // Crear un div para el producto
                var productoDiv = document.createElement('div');
                productoDiv.className = 'col-md-4';

                // Crear la estructura HTML del producto
                productoDiv.innerHTML = `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombreProducto}" class="img-fluid">
                    <div class="producto-info">
                        <h3>${producto.nombreProducto}</h3>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <p>Precio: $${producto.precio}</p>
                     </div>
                </div>
`;


                // Agregar el div del producto al contenedor
                productosContainer.appendChild(productoDiv);
            });
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
});


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
                formulario.action = 'Prodcuctos.html';
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
                    window.location.href = `Prodcuctos.html?idSuper=${establecimientoId}`;
                });

                // Agregar el div del establecimiento al contenedor
                establecimientosContainer.appendChild(establecimientoDiv);
            });
        })
        .catch(error => {
            console.error('Error al obtener establecimientos:', error);
        });
});


