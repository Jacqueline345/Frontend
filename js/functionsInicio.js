
document.addEventListener("DOMContentLoaded", function() {
    loadAvatars();
});

function loadAvatars() {
    // Simulación de carga de avatars de usuarios restringidos
    const avatars = [
        { id: 1, name: "Usuario 1", img: "img/avatar1.png" },
        { id: 2, name: "Usuario 2", img: "img/avatar2.png" }
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
}

function showAdminPinPrompt() {
    const pinModal = new bootstrap.Modal(document.getElementById('pinModal'));
    pinModal.show();
}

document.addEventListener('DOMContentLoaded', function () {
    async function validateAdminPin() {
        const pin = document.getElementById('pin').value;

        if (!pin) {
            alert("Por favor, introduce un PIN.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = "gestion_videos.html";
            } else {
                alert("PIN incorrecto");
            }
        } catch (error) {
            console.error("Error al validar el PIN:", error);
            alert("Hubo un problema al validar el PIN. Inténtalo de nuevo.");
        }
    }

    const validarButton = document.getElementById('validarPinButton');
    if (validarButton) {
        validarButton.addEventListener('click', validateAdminPin);
    }
});


function showUserPinPrompt(userId) {
    const pin = prompt("Ingrese el PIN del usuario restringido:");
    // Validar el PIN del usuario restringido (simulación)
    if (pin === "5678") {
        window.location.href = "playlist.html"; // Redirigir a la pantalla del playlist
    } else {
        alert("PIN incorrecto");
    }
}