var establecimientoId = localStorage.getItem('establecimientoId')
document.addEventListener('DOMContentLoaded', (event) => {
    // Obtener el contexto del primer gráfico
    var ctx1 = document.getElementById('salesPerMonthChart').getContext('2d');

    // Datos de ejemplo para inicializar el gráfico
    var salesPerMonthData = {
        labels: [],
        datasets: [{
            label: 'Ganancias por mes',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Crear el gráfico con los datos de ejemplo
    var salesPerMonthChart = new Chart(ctx1, {
        type: 'bar',
        data: salesPerMonthData
    });

    // Endpoint de ejemplo (reemplaza esto con la URL de tu endpoint real)
    var endpointURL = `https://walmart.somee.com/publish/v1/Venta/VentasPorMesTienda?idEstablecimiento=${establecimientoId}`;

    // Hacer la solicitud GET al endpoint
    fetch(endpointURL)
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            // Procesar los datos recibidos para el gráfico
            data.forEach(item => {
                salesPerMonthData.labels.push(item.mes); 
                // Agregar el mes como etiqueta
                salesPerMonthData.datasets[0].data.push(item.ganancias); 
                // salesPerMonthData.datasets[0].data.push(item.totalProductosVendidos)// Agregar las ganancias como dato
            });

            // Actualizar el gráfico con los nuevos datos
            salesPerMonthChart.update();
        })
        .catch(error => {
            console.error('Error al obtener los datos de ventas por mes:', error);
        });
});






var ctx2 = document.getElementById('salesTrendsChart').getContext('2d');
var salesTrendsChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
            label: '# de Ventas',
            data: [2, 9, 3, 5, 2],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    }
});

// var salesTableBody = document.getElementById('salesTable').getElementsByTagName('tbody')[0];
// var salesData = [
//     { product: 'Producto 1', date: '2022-01-01', quantity: 1, price: 100 },
//     { product: 'Producto 2', date: '2022-01-02', quantity: 2, price: 200 },
//     // Agrega más datos de ventas aquí
// ];
// salesData.forEach(sale => {
//     var row = salesTableBody.insertRow();
//     row.insertCell(0).innerHTML = sale.product;
//     row.insertCell(1).innerHTML = sale.date;
//     row.insertCell(2).innerHTML = sale.quantity;
//     row.insertCell(3).innerHTML = sale.price;
// });

document.addEventListener('DOMContentLoaded', (event) => {
    var salesTableBody = document.getElementById('salesTable').getElementsByTagName('tbody')[0];

    // Realizar la solicitud GET a tu endpoint de ventas
    fetch(`https://walmart.somee.com/publish/v1/Venta/UltimasVentas?idEstablecimiento=${establecimientoId}`)
    .then(response => response.json()) // Convertir la respuesta a formato JSON
        .then(data => {
            // Procesar los datos de la respuesta
            data.forEach(sale => {
                // Convertir la fecha a un formato más legible
                var formattedDate = new Date(sale.fechaVenta).toLocaleString();

                // Agregar una fila a la tabla por cada venta
                var row = salesTableBody.insertRow();
                row.insertCell(0).innerHTML = sale.idVenta;
                row.insertCell(1).innerHTML = formattedDate; // Usar la fecha formateada
                row.insertCell(2).innerHTML = sale.totalPagado + ' Pesos';
                row.insertCell(3).innerHTML = sale.nombreTienda;
                row.insertCell(4).innerHTML = sale.idTransaccion;
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de ventas:', error);
        });
});
