document.getElementById("myForm").addEventListener("submit", (event) => { 
    event.preventDefault();
    var formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("address", document.getElementById("address").value); 
    formData.append("image", document.getElementById("image").files[0]);

    var url = "https://walmart.somee.com/publish/v1/Establecimiento"; 
    fetch(url, {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud.");
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta de la API:", data);
        
    })
    .catch(error => {
        console.error("Error:", error);
    });
});
