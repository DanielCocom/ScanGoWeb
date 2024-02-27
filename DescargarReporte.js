document.getElementById('downloadPdfButton').addEventListener('click', function() {
    var doc = new jsPDF();
  
    // Aquí puedes agregar el código para generar el contenido del PDF.
    // Por ejemplo, puedes agregar texto con doc.text('Hello world!', 10, 10)
    // o puedes agregar una imagen con doc.addImage(imgData, 'JPEG', 15, 40, 180, 160)
  
    doc.save('reporte.pdf');
  });