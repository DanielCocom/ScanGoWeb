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


document.addEventListener('DOMContentLoaded', function () {
    var ctx2 = document.getElementById('leastSoldProductsChart').getContext('2d');
    var leastSoldProductsChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: '# de Ventas',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        }
    });

    var url = 'https://walmart.somee.com/publish/v1/Venta/ProductoMenosVendido?idEstablecimiento=1';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener los nombres de los productos y la cantidad de ventas
            var nombresProductos = data.map(producto => producto.nombre);
            var cantidadVentas = data.map(producto => producto.ventas);

            // Actualizar los datos del gráfico
            leastSoldProductsChart.data.labels = nombresProductos;
            leastSoldProductsChart.data.datasets[0].data = cantidadVentas;
            leastSoldProductsChart.update();
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    var url = 'https://walmart.somee.com/publish/v1/Venta/VentasTienda?idEstablecimiento=1';

    fetch(url)
        .then(response => response.json())
        .then(ultimasCompras => {
            // Obtener las fechas de las compras
            var fechasCompras = ultimasCompras.map(compra => new Date(compra.fechaVenta).toLocaleDateString());
            
            // Contar el número de compras para cada fecha
            var comprasPorFecha = {};
            fechasCompras.forEach(fecha => {
                if (comprasPorFecha[fecha]) {
                    comprasPorFecha[fecha]++;
                } else {
                    comprasPorFecha[fecha] = 1;
                }
            });

            // Convertir los datos en un formato adecuado para el gráfico
            var fechas = Object.keys(comprasPorFecha);
            var cantidadCompras = fechas.map(fecha => comprasPorFecha[fecha]);

            // Actualizar los datos del gráfico
            latestPurchasesChart.data.labels = fechas;
            latestPurchasesChart.data.datasets[0].data = cantidadCompras;
            latestPurchasesChart.update();
        })
        .catch(error => {
            console.error('Error al obtener las últimas compras:', error);
        });

    var ctx3 = document.getElementById('latestPurchasesChart').getContext('2d');
    var latestPurchasesChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '# de Compras',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        }
    });
});
