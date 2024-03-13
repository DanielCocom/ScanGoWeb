document.getElementById('downloadPdfButton').addEventListener('click', function() {
  var doc = new jsPDF();

  // Realizar la solicitud GET a tu endpoint de productos más vendidos
  fetch('https://walmart.somee.com/publish/v1/Venta/ProductoMasVendido?idEstablecimiento=1')
      .then(response => response.json()) // Convertir la respuesta a formato JSON
      .then(data => {
          // Agregar título al reporte
          doc.setFontSize(20);
          doc.text('Reporte del Establecimiento', 10, 20);
        
          // Agregar texto descriptivo
          doc.setFontSize(12);
          doc.text('Reporte del establecimiento.', 10, 30);

          // Iterar sobre los datos de productos obtenidos y agregarlos al reporte
          var posY = 35; // Posición inicial para el contenido de los productos
          data.forEach((producto, index) => {
              posY += 10; // Aumentar la posición en Y para cada nuevo elemento
              doc.text(`${producto.nombreProducto}: ${producto.cantidadVendida}`, 10, posY);
          });

          // Realizar la solicitud GET a tu endpoint de ventas por mes
          fetch('https://walmart.somee.com/publish/v1/Venta/VentasPorMesTienda?idEstablecimiento=1')
              .then(response => response.json()) // Convertir la respuesta a formato JSON
              .then(ventasPorMes => {
                  // Agregar espacio entre la lista de productos y la información de ventas por mes
                  posY += 20;
                  // Agregar título de ventas por mes
                  doc.setFontSize(16);
                  doc.text('Ventas por Mes', 10, posY);
                  // Iterar sobre los datos de ventas por mes y agregarlos al reporte
                  ventasPorMes.forEach((mes, index) => {
                      posY += 10; // Aumentar la posición en Y para cada nuevo elemento
                      doc.text(`${mes.mes} ${mes.anio}: Ganancias ${mes.ganancias}, Total Productos Vendidos - ${mes.totalProductosVendidos}`, 10, posY);
                  });

                  // Realizar la solicitud GET a tu endpoint de últimas ventas
                  fetch('https://walmart.somee.com/publish/v1/Venta/UltimasVentas?idEstablecimiento=1')
                      .then(response => response.json()) // Convertir la respuesta a formato JSON
                      .then(ultimasVentas => {
                          // Agregar espacio entre la información de ventas por mes y las últimas ventas
                          posY += 20;
                          // Agregar título de últimas ventas
                          doc.setFontSize(13);
                          doc.text('Últimas Ventas', 8, posY);
                          // Iterar sobre los datos de últimas ventas y agregarlos al reporte
                          ultimasVentas.forEach((venta, index) => {
                            posY += 10; // Aumentar la posición en Y para cada nuevo elemento
                            var fecha = new Date(venta.fechaVenta);
                            var formattedFecha = fecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                            doc.text(`ID: ${venta.idVenta}, Fecha: ${formattedFecha}, Total Pagado: ${venta.totalPagado}, Tienda: ${venta.nombreTienda}, Transacción: ${venta.idTransaccion}`, 10, posY);
                        });
                        
                          // Guardar el PDF
                          doc.save('reporte.pdf');
                      })
                      .catch(error => {
                          console.error('Error al obtener los datos de últimas ventas:', error);
                          // Guardar el PDF incluso si hay un error al obtener los datos de últimas ventas
                          doc.save('reporte.pdf');
                      });
              })
              .catch(error => {
                  console.error('Error al obtener los datos de ventas por mes:', error);
                  // Guardar el PDF incluso si hay un error al obtener los datos de ventas por mes
                  doc.save('reporte_productos_mas_vendidos.pdf');
              });
      })
      .catch(error => {
          console.error('Error al obtener los datos de productos más vendidos:', error);
      });
});
