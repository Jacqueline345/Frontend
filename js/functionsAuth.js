async function loginUsuario() {
    let usuario = {
        correo: document.getElementById('correo').value,
        contraseña: document.getElementById('contraseña').value
    };
    const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Login exitoso:", data);
        alert("Login exitoso");
        // Guardar el nombre del usuario en el almacenamiento local
        localStorage.setItem('userName', data.nombre);
        // Redirigir a la página de inicio
        window.location.href = 'inicio.html';
    } else {
        console.log("Error:", data.message);
        alert("Error: " + data.message);
    }
}

function logoutUsuario() {
    // Eliminar el token y el nombre del usuario del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    alert("Logout exitoso");
    // Redirigir a la página de login
    window.location.href = 'login.html';
}

async function registerUsuario() {
    let usuario = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        telefono: document.getElementById('telefono').value,
        correos: document.getElementById('correos').value,
        nacimiento: document.getElementById('nacimiento').value,
        pais: document.getElementById('pais').value,
        contrasena: document.getElementById('contrasena').value,
        pin: document.getElementById('pin').value,
    };
    const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Usuario registrado:', data);
        alert('Usuario registrado exitosamente');
        window.location.href = 'index.html';
    } else {
        alert("Error al registrar usuario");
    }
}