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

function validateAdminPin() {
    const pin = document.getElementById('adminPin').value;
    // Validar el PIN del administrador (simulación)
    if (pin === "1234") {
        window.location.href = "gestion_videos.html"; // Redirigir a la pantalla de gestión de videos
    } else {
        alert("PIN incorrecto");
    }
}

function showUserPinPrompt(userId) {
    const pin = prompt("Ingrese el PIN del usuario restringido:");
    // Validar el PIN del usuario restringido (simulación)
    if (pin === "5678") {
        window.location.href = "playlist.html"; // Redirigir a la pantalla del playlist
    } else {
        alert("PIN incorrecto");
    }
}