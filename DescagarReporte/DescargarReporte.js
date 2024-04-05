document.getElementById('downloadPdfButton').addEventListener('click', function () {
 doc = new jsPDF();

  var url = `https://walmart.somee.com/publish/V1/ReporteMensual?idEstablecimiento=1&dateTime=2024-03-06T23%3A03%3A59.493`;
  
  fetch(url)
  .then(response => response.json())
  .then(reporteData => {
    const { nombreEstablecimiento, mes, numeroVentas, ingresostotoales, gananciasPromedioPorDia, productosMasVendidos } = reporteData;
    
    // Encabezado y detalles del informe
    doc.setFont('Arial', 'bold', 16);
    doc.text('Reporte de Ventas - ' + nombreEstablecimiento, 20, 30);
    doc.setFont('Arial', 'normal', 12);
    doc.text('Mes:', 40, 50);
    doc.text(mes, 60, 50);
    // ... (agregar texto para número de ventas, ingresos totales, ganancias promedio por día)

    // Productos más vendidos
    doc.addPage();
    doc.setFont('Arial', 'bold', 14);
    doc.text('Productos más vendidos', 20, 30);
    const productHeaders = ['Codigo Barras', 'Nombre', 'Cantidad Vendida'];
    const productData = productosMasVendidos.map(producto => [producto.idProducto, producto.nombreProducto, producto.cantidadVendida]);
    autoTable(doc, {
      head: [productHeaders],
      body: productData,
      startY: 40,
      styles: {
        fontSize: 10,
      }
    });


    doc.save('reporte-ventas.pdf');
  })
  .catch(error => {
    console.error("Error al obtener datos de la API:", error);
  });
});
