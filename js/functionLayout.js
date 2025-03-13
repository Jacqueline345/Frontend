// Función para cargar el layout
function loadLayout() {
    fetch('layouts/layoutIndex.html') // Ruta al archivo layout.html
        .then(response => response.text())
        .then(data => {
            // Inserta el contenido del layout en el placeholder
            document.getElementById('layout-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error cargando el layout:', error);
        });
}

// Cargar el layout cuando la página se cargue
window.onload = function() {
    loadLayout();
}