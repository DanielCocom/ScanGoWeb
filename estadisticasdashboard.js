document.addEventListener('DOMContentLoaded', function () {
    var url = 'https://walmart.somee.com/publish/v1/Venta/ProductoMasVendido?idEstablecimiento=1';

    fetch(url)
        .then(response => response.json())
        .then(productosMasVendidos => {
            // Obtener los nombres de los productos y la cantidad de ventas
            var nombresProductos = productosMasVendidos.map(producto => producto.nombreProducto);
            var cantidadVentas = productosMasVendidos.map(producto => producto.cantidadVendida);

            // Actualizar los datos del gráfico
            mostSoldProductsChart.data.labels = nombresProductos;
            mostSoldProductsChart.data.datasets[0].data = cantidadVentas
            mostSoldProductsChart.update();
        })
        .catch(error => {
            console.error('Error al obtener los productos más vendidos:', error);
        });

    var ctx1 = document.getElementById('mostSoldProductsChart').getContext('2d');
    var mostSoldProductsChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: '# de Ventas ',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    });
});


var ctx2 = document.getElementById('leastSoldProductsChart').getContext('2d');
var leastSoldProductsChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5'],
        datasets: [{
            label: '# de Ventas',
            data: [2, 3, 5, 7, 9],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    }
});

var ctx3 = document.getElementById('latestPurchasesChart').getContext('2d');
var latestPurchasesChart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
            label: '# de Compras',
            data: [2, 9, 3, 5, 2],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    }
});