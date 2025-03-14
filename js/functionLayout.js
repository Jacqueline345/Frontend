// Función para cargar el layout cuando el usuario está logueado
function loadLayout() {
    fetch('layouts/layout.html') // Ruta al archivo layout.html
        .then(response => response.text())
        .then(data => {
            // Inserta el contenido del layout en el placeholder
            document.getElementById('layout-placeholder').innerHTML = data;
            // Obtener el nombre del usuario del almacenamiento local y mostrarlo
            const userName = localStorage.getItem('userName');
            if (userName) {
                document.getElementById('user-name').textContent = userName;
            }
        })
        .catch(error => {
            console.error('Error cargando el layout:', error);
        });
}

// Función para cargar el layout cuando no hay ningún usuario logueado
function loadLayoutIndex() {
    fetch('layouts/layoutIndex.html') // Ruta al archivo layoutIndex.html
        .then(response => response.text())
        .then(data => {
            // Inserta el contenido del layout en el placeholder
            document.getElementById('layout-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error cargando el layout:', error);
        });
}

// Cargar el layout correspondiente cuando la página se cargue
window.onload = function () {
    const userName = localStorage.getItem('userName');
    if (userName) {
        loadLayout(); // Cargar layout para usuario logueado
    } else {
        loadLayoutIndex(); // Cargar layout para usuario no logueado
    }
}