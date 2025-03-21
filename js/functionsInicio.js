
document.addEventListener("DOMContentLoaded", function () {
    loadAvatars();
});

async function loadAvatars() {
    try {
        const response = await fetch('http://localhost:3001/restringido'); // Cambia la ruta a tu API
        //const avatars = await response.json();

        //Simulación de carga de avatars de usuarios restringidos
        const avatars = [
            { id: 1, name: "Usuario 1", img: "/img/avatar1.png" },
            { id: 2, name: "Usuario 2", img: "/img/avatar2.png" }
        ];

        const container = document.getElementById('avatars-container');

        avatars.forEach(avatar => {
            const avatarElement = document.createElement('div');
            avatarElement.classList.add('avatar');
            avatarElement.innerHTML = `
            <img src="${avatar.img}" alt="${avatar.name}" class="rounded-circle" style="width: 100px; height: 100px;">
            <p>${avatar.name}</p>
        `;
            avatarElement.addEventListener('click', () => showUserPinPrompt(avatar.id));
            container.appendChild(avatarElement);
        });
    }catch (error){
        console.error('Error al carga los avatars: ', error);
    }
}

function showAdminPinPrompt() {
    const pinModal = new bootstrap.Modal(document.getElementById('pinModal'));
    pinModal.show();
}

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
            window.location.href = "gestion_videos.html";
            console.log(data.message); // Mensaje de autenticación exitosa
        } else {
            const errorData = await response.json();
            console.log(errorData.message); // Mensaje de error (ej. PIN incorrecto o usuario no encontrado)
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
    }
}
function showUserPinPrompt(userId) {
    const pin = prompt("Ingrese el PIN del usuario restringido:");
    // Validar el PIN del usuario restringido (simulación)
    if (pin === "5678") {
        window.location.href = "playlistUsuarioRestringido.html"; // Redirigir a la pantalla del playlist
    } else {
        alert("PIN incorrecto");
    }
}