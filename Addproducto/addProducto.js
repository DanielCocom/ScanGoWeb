document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("productForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        var productId = document.getElementById("productId").value;
        var productName = document.getElementById("productName").value;
        var productPrice = parseFloat(document.getElementById("productPrice").value);
        var productQuantity = parseInt(document.getElementById("productQuantity").value);
        var productImage = document.getElementById("productImage").files[0]; // Obtener el archivo de imagen seleccionado

        // Crear un objeto FormData y agregar los datos del formulario
        var formData = new FormData();
        formData.append("idProducto", productId);
        formData.append("nombre", productName);
        formData.append("precio", productPrice);
        formData.append("idTipoProducto", 1);
        formData.append("idTipoDescuento",1);
        formData.append("imagen", productImage);
         // idtipo y idDescuento

        var url = `https://walmart.somee.com/publish/v1/Producto?idEstablecimiento=1&cantidad=${productQuantity}`;

        // Hacer la solicitud POST a tu API utilizando fetch
        fetch(url, {
            method: "POST",
            body: formData, // Pasar el objeto FormData como cuerpo de la solicitud
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error al registrar el producto");
                }
            })
            .then((data) => {
                alert("Producto registrado exitosamente:", data);
            })
            .catch((error) => {
                console.error("Error al registrar el producto:", error);
            });
    });
});
