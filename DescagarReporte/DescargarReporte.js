

document.getElementById('downloadPdfButton').addEventListener('click', function () {
  console.log("El botón fue presionado");
  var doc = new window.jspdf.jsPDF();

  var url = `https://walmart.somee.com/publish/V1/ReporteMensual?idEstablecimiento=1&dateTime=2024-03-06T23%3A03%3A59.493`;
  
  fetch(url)
  .then(response => response.json())
  .then(reporteData => {
    const { nombreEstablecimiento, mes, numeroVentas, ingresosTotales, gananciasPromedioPorDia, productosMasVendidos,productosMenosVendidos } = reporteData;
    
   // Encabezado y detalles del informe
doc.setFont('helvetica', 'bold');
doc.setFontSize(16);
doc.text('Reporte de Ventas - ' + nombreEstablecimiento, doc.internal.pageSize.width / 2, 30, { align: 'center' });
doc.setFont('helvetica', 'normal');
doc.setFontSize(12);
doc.text('Mes:', 40, 50);
doc.text(mes, 100, 50);
doc.text('Número de Ventas:', 40, 60);
doc.text(numeroVentas ? numeroVentas.toString() : 'N/A', 100, 60);
doc.text('Ingresos Totales:', 40, 70);
doc.text(ingresosTotales ? ingresosTotales.toString() : 'N/A', 100, 70);
doc.text('Ganancias Promedio por Día:', 40, 80);
doc.text(gananciasPromedioPorDia ? gananciasPromedioPorDia.toString() : 'N/A', 100, 80);
// Productos más vendidos
doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.text('Productos más vendidos', doc.internal.pageSize.width / 2, 100, { align: 'center' }); 
const productHeaders = ['Codigo Barras', 'Nombre', 'Cantidad Vendida'];
const productData = productosMasVendidos.map(producto => [producto.idProducto, producto.nombreProducto, producto.cantidadVendida]);
doc.autoTable({
  head: [productHeaders],
  body: productData,
  startY: 110, 
  styles: {
    fontSize: 10,
  },
  theme: 'grid',
  tableWidth: 'auto',
});

// Productos menos vendidos
doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.text('Productos menos vendidos', doc.internal.pageSize.width / 2, doc.autoTable.previous.finalY + 20, { align: 'center' }); 
const productLessSoldHeaders = ['Codigo Barras', 'Nombre', 'Cantidad Vendida'];
const productLessSoldData = productosMenosVendidos.map(producto => [producto.idProducto, producto.nombreProducto, producto.cantidadVendida]);
doc.autoTable({
  head: [productLessSoldHeaders],
  body: productLessSoldData,
  startY: doc.autoTable.previous.finalY + 30, 
  styles: {
    fontSize: 10,
  },
  theme: 'grid',
  tableWidth: 'auto',
});

    doc.save('reporte-ventas.pdf');
  })
  .catch(error => {
    console.error("Error al obtener datos de la API:", error);
  });
});