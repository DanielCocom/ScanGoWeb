document.addEventListener('DOMContentLoaded', (event) => {
    var ctx1 = document.getElementById('salesPerMonthChart').getContext('2d');
    var salesPerMonthChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
            datasets: [{
                label: '# de Ventas',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
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
  
    var salesTableBody = document.getElementById('salesTable').getElementsByTagName('tbody')[0];
    var salesData = [
        { product: 'Producto 1', date: '2022-01-01', quantity: 1, price: 100 },
        { product: 'Producto 2', date: '2022-01-02', quantity: 2, price: 200 },
        // Agrega más datos de ventas aquí
    ];
    salesData.forEach(sale => {
        var row = salesTableBody.insertRow();
        row.insertCell(0).innerHTML = sale.product;
        row.insertCell(1).innerHTML = sale.date;
        row.insertCell(2).innerHTML = sale.quantity;
        row.insertCell(3).innerHTML = sale.price;
    });
  });