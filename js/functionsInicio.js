document.addEventListener('DOMContentLoaded', async () => {
    await usuariosGet();
});

// Función para cargar los usuarios restringidos desde la base de datos
async function usuariosGet() {
    try {
        const response = await fetch("http://localhost:3001/restringido");
        const restringidos = await response.json();
        console.log('restringidos', restringidos);

        if (restringidos) {
            const container = document.getElementById('result');
            container.innerHTML = '';
            restringidos.forEach(element => {
                const item = document.createElement('li');
                item.innerHTML = `
                        <div class="card h-100 text-center">
                        <img src="${element.avatar}" class="card-img-top img-thumbnail avatar-img" alt="${element.nombre_completo}">
                        <div class="card-body">
                            <h5 class="card-title">${element.nombre_completo}</h5>
                            <a href="#" class="btn btn-primary select_button" data-id="${element._id}" data-nombre="${element.nombre_completo}">Seleccionar</a>
                        </div>
                    </div>
                `;
                item.setAttribute('data-id', element._id);
                container.appendChild(item);
            });

            assignSelectEvents();
        }
    } catch (error) {
        console.error('Error al cargar usuarios restringidos:', error);
    }
}

// Función para asignar eventos de selección a los botones
function assignSelectEvents() {
    const buttons = document.querySelectorAll('.select_button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const userId = button.getAttribute('data-id');
            showPinPrompt(userId);
        });
    });
}

// Función para mostrar el modal de ingreso de PIN
function showPinPrompt(userId) {
    const pinModal = new bootstrap.Modal(document.getElementById('pinModal'));
    document.getElementById('validarPinButton').onclick = () => validatePin(userId);
    pinModal.show();
}

// Función para validar el PIN del usuario restringido
async function validatePin(userId) {
    userData = document.getElementById("pin").value;
    try {
        const response = await fetch('http://localhost:3001/validar', { // Cambia el puerto según corresponda
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pin: userData })
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href = "playlistUsuarioRestringido.html";
            console.log(data.message); // Mensaje de autenticación exitosa
        } else {
            const errorData = await response.json();
            console.log(errorData.message); // Mensaje de error (ej. PIN incorrecto o usuario no encontrado)
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}

// Función para mostrar el prompt de PIN de administración
function showAdminPinPrompt() {
    const pinModal = new bootstrap.Modal(document.getElementById('pinModal'));
    document.getElementById('validarPinButton').onclick = validateAdminPin;
    pinModal.show();
}

// Función para validar el PIN de administración
async function validateAdminPin() {
    userData = document.getElementById("pin").value;
    try {
        const response = await fetch('http://localhost:3001/validar', { // Cambia el puerto según corresponda
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pin: userData })
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href = "panelVideos.html";
            console.log(data.message); // Mensaje de autenticación exitosa
        } else {
            const errorData = await response.json();
            console.log(errorData.message); // Mensaje de error (ej. PIN incorrecto o usuario no encontrado)
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}