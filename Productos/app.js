// Función para mostrar un producto en la interfaz
function mostrarProducto(producto) {
    var productoDiv = document.createElement('div');
    productoDiv.className = 'col-md-2';

    productoDiv.innerHTML = `
        <div class="producto rounded">
            <img src="${producto.imagen}" alt="${producto.nombreProducto}" class="img-fluid">
            <div class="producto-info">
                <h3>${producto.nombreProducto}</h3>
                <p>Stock: ${producto.cantidad}</p>
                <p>Precio: $${producto.precio}</p>
            </div>
        </div>
    `;

    return productoDiv;
}

// Función para cargar todos los productos inicialmente
// Función para cargar todos los productos inicialmente
function cargarProductos() {
    // const urlParams = new URLSearchParams(window.location.search);
    // const establecimientoId = urlParams.get('idSuper');

    var establecimientoId = localStorage.getItem('establecimientoId')

    var productosContainer = document.getElementById('producto-content');
    var spinner = document.createElement('div');
    spinner.className = 'spinner';
    productosContainer.appendChild(spinner);

    fetch(`https://walmart.somee.com/publish/v1/Establecimiento/Inventario?idEstablecimiento=${establecimientoId}`)
        .then(response => response.json())
        .then(productos => {
            productosContainer.removeChild(spinner);

            productos.forEach(producto => {
                var productoDiv = mostrarProducto(producto);
                productosContainer.appendChild(productoDiv);
            });
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

// Función para realizar la búsqueda de productos
// Reducir redundancia en el codigo
function buscarProductos(searchTerm) {
    var searchUrl = `https://walmart.somee.com/publish/v1/Establecimiento/BuscarProducto?value=${searchTerm}`;

    var productosContainer = document.getElementById('producto-content');
    productosContainer.innerHTML = '';

    if (!searchTerm) {
        cargarProductos();
        return;
    }

    fetch(searchUrl)
        .then(response => response.json())
        .then(productos => {

            productosContainer.innerHTML = '';

            if (productos.length === 0) {
                // Si no se encontraron productos, mostrar un mensaje
                var mensaje = document.createElement('div');
                mensaje.textContent = 'No se encontraron resultados.';
                productosContainer.appendChild(mensaje);
            } else {
                // Si se encontraron productos, mostrarlos
                productos.forEach(producto => {
                    var productoDiv = mostrarProducto(producto);
                    productosContainer.appendChild(productoDiv);
                });
            }
        })
        .catch(error => {
            console.error('Error en la solicitud de búsqueda:', error);
        });
}


// Manejo del evento DOMContentLoaded para cargar los productos inicialmente
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos();
});

// Manejo del evento de envío del formulario de búsqueda
var searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var searchTerm = document.getElementById('searchInput').value;
    buscarProductos(searchTerm);
});

var searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', function (event) {
    // Verificar si se presionó la tecla Enter (código 13)
    if (event.key === 'Enter') {
        var searchTerm = searchInput.value;
        buscarProductos(searchTerm);
    }
});

console.log(localStorage.getItem('establecimientoNombre'));
