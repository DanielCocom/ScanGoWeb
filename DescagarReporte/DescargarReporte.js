document.getElementById('downloadPdfButton').addEventListener('click', function () {
  var doc = new jsPDF();
  var establecimientoId = localStorage.getItem('establecimientoId');

  // Realizar la solicitud GET a tu endpoint de productos más vendidos
  fetch(`https://walmart.somee.com/publish/v1/Venta/ProductoMasVendido?idEstablecimiento=${establecimientoId}`)
    .then(response => response.json())
    .then(productosMasVendidos => {
      // Agregar título al reporte
      doc.setFontSize(20);
      doc.text(`Reporte Mensual del Establecimiento${localStorage.getItem('establecimientoNombre')}`, 10, 20);

      // Agregar texto descriptivo  
      doc.setFontSize(15);
      doc.text('A continuación se presentan las siguientes pautas en el desempeño de las ventas del establecimiento.', 10, 30);

      // Configurar posición inicial y margen de la tabla de productos
      var startX = 10;
      var startY = 40;
      var margin = 10;
      var col1Width = 80;
      var col2Width = 40;

      // Agregar encabezados de la tabla de productos
      doc.setFontSize(18);
      doc.setFontStyle('normal');
      doc.text('Producto', startX, startY);
      doc.text('Cantidad Vendida', startX + col1Width + margin, startY);

      startY += margin;

      // Agregar datos de productos
      productosMasVendidos.slice(0, 5).forEach((producto, index) => {
        var productoNombre = producto.nombreProducto;
        var cantidadVendida = producto.cantidadVendida;

        doc.text(productoNombre, startX, startY + (index + 1) * margin);
        doc.text(cantidadVendida.toString(), startX + col1Width + margin, startY + (index + 1) * margin);
      });

      // Realizar la solicitud GET a tu endpoint de ventas
      fetch(`https://walmart.somee.com/publish/v1/Venta/VentasTienda?idEstablecimiento=${establecimientoId}`)
        .then(response => response.json())
        .then(ventas => {
          // Configurar posición inicial y margen de la tabla de ventas
          startY += (productosMasVendidos.length + 2) * margin;
          doc.text('ID Venta', startX, startY);
          doc.text('Fecha Venta', startX + 50, startY);
          doc.text('Total Pagado', startX + 120, startY);
          doc.text('Nombre Tienda', startX + 200, startY);
          doc.text('ID Transacción', startX + 320, startY);

          // Agregar datos de ventas
          ventas.slice(0, 5).forEach((venta, index) => {
            startY += margin;
            doc.text(venta.idVenta.toString(), startX, startY);
            doc.text(formatDate(venta.fechaVenta), startX + 50, startY);
            doc.text(venta.totalPagado.toString(), startX + 120, startY);
            doc.text(venta.nombreTienda, startX + 200, startY);
            doc.text(venta.idTransaccion, startX + 320, startY);
          });

          // Guardar el PDF
          doc.save('Reporte.pdf');
        })
        .catch(error => {
          console.error('Error al obtener las ventas:', error);
        });
    })
    .catch(error => {
      console.error('Error al obtener los productos más vendidos:', error);
    });
});


function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + date.toLocaleTimeString();
}