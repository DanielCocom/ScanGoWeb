
        document.addEventListener('DOMContentLoaded', function () {
            // Manejar el clic del botón de alternar barra lateral
            document.getElementById('sidebarToggle').addEventListener('click', function () {
                document.getElementById('sidebar').classList.toggle('show');
            });
        });
    