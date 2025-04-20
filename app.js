const error = (e) => console.log(e.target.responseText);

function UsuarioCreated() {
    alert ("Usuario creado correctamente");
}
async function saveUsuario() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const correos = document.getElementById('correos').value;
    const nacimiento = document.getElementById('nacimiento').value;
    const pais = document.getElementById('pais').value;
    const contrasena = document.getElementById('contrasena').value;
    const pin = document.getElementById('pin').value;

    // Validar formato de fecha
    function isValidDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    }
    
    if (!isValidDate(nacimiento)) {
        alert("Fecha de nacimiento inválida. Utiliza el formato YYYY-MM-DD.");
        return;
    }
    
    const query = `
        mutation {
            createUsuarios(
                nombre: "${nombre}",
                apellidos: "${apellidos}",
                telefono: ${parseInt(telefono, 8)},
                correos: "${correos}",
                nacimiento: "${nacimiento}",
                pais: "${pais}",
                contrasena: "${contrasena}",
                pin: ${parseInt(pin, 10)}
            ) {
                id
                nombre
                apellidos
            }
        }
    `;

    try {
        const response = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        window.location.href = "login.html";

        if (result.errors) {
            console.error('Errores en la respuesta:', result.errors);
            alert("Error al registrar usuario: " + result.errors[0].message);
        } else {
            console.log('Usuario registrado exitosamente:', result.data.createUsuarios);
            alert('Usuario registrado exitosamente');
        }
    } catch (error) {
        console.error('Error al hacer la solicitud o procesar datos:', error);
        alert("Error al hacer la solicitud o procesar datos");
    }
}
