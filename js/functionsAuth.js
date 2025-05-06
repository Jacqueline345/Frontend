async function loginUsuario() {
    let usuario = {
        correo: document.getElementById('correo').value,
        contrasena: document.getElementById('contrasena').value
    };

    const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
        credentials: 'include' // Asegúrate de incluir las credenciales si es necesario
    });

    const data = await response.json();
    console.log("Response:", data);

    if (response.ok) {        
        if (data.estado === 'activo') {
            console.log("Login exitoso:", data);
            alert("Login exitoso");
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('userName', data.nombre);
            localStorage.setItem('userId', data.id); // Guardar el ID del usuario
            localStorage.setItem('codigo2FA', data.codigo2FA); // Guardar el código 2FA
            localStorage.setItem('codigoExpira', data.codigoExpira); // Guardar la fecha de expiración del código 2FA
            window.location.href = 'Codigo.html';
        } else {
            alert("Error: El usuario no está activo");
            window.location.href = 'login.html';
        }
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
        localStorage.setItem('jwt', data.token);
        console.log('Usuario registrado:', data);
        alert('Usuario registrado exitosamente');
        window.location.href = 'index.html';
    } else {
        alert("Error al registrar usuario");
    }
}