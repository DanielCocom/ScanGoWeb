var ctx1 = document.getElementById('mostSoldProductsChart').getContext('2d');
var mostSoldProductsChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5'],
        datasets: [{
            label: '# de Ventas',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    }
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