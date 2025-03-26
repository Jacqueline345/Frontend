// Obtener el ID desde la URL
function obtenerIDDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id'); // Extrae el ID del query string
    return id;
}

async function createUsuarios() {
    let usuario = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        telefono: document.getElementById('telefono').value,
        correos: document.getElementById('correos').value,
        nacimiento: document.getElementById('nacimiento').value,
        pais: document.getElementById('pais').value,
        contraseña: document.getElementById('contraseña').value,
        pin: document.getElementById('pin').value,
    }
    const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarios)
    });

    if (response && response.status == 201) {
        usuario = await response.json();
        console.log('User saved', usuario);
        alert('Usuario guardado');
    } else {
        alert("Shit's on fire!");
    }
}

// Cargar datos del usuario y rellenar los inputs
async function cargarDatosUsuario() {
    const id = obtenerIDDesdeURL();
    try {
        const response = await fetch(`http://localhost:3001/restringido/${id}`);
        const usuario = await response.json();

        console.log("Datos recibidos del usuario:", usuario); // Verifica la respuesta de la API

        if (!response.ok) {
            throw new Error(usuario.message);
        }

        // Verificar que los elementos existen antes de asignar valores
        document.getElementById('nombre_completo').value = usuario.nombre_completo || "";
        document.getElementById('numero').value = usuario.numero || "";
        document.getElementById('edad').value = usuario.edad || "";  
        document.getElementById('pin').value = usuario.pin || "";  
        document.getElementById('avatar').src = `http://localhost:3001${usuario.avatar}` || "";
        document.getElementById('editId').value = usuario._id || ""; // Guardar el ID oculto

    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
}

function isAdult(nacimiento) {
    const today = new Date();
    const birthDate = new Date(nacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}

/*document.getElementById('registerForm').addEventListener('submit', function (event) {
    const birthdate = document.getElementById('nacimiento').value;

    // Validación en el frontend
    if (!isAdult(nacimiento)) {
        event.preventDefault();
        alert('Debes ser mayor de 18 años para registrarte.');
    }       
});*/

async function restringidoGet() {
    const response = await fetch("http://localhost:3001/restringido");
    const restringido = await response.json();
    console.log('restringidos', restringido);

    if (restringido) {
        const container = document.getElementById('result');
        container.innerHTML = '';
        restringido.forEach(element => {
            const item = document.createElement('li');
            item.innerHTML = `
            <td><img src="http://localhost:3001${element.avatar}" alt="Avatar" width="50" height="50"></td> <!-- Columna para el avatar -->
            <td>${element.nombre_completo}</td> <!-- Columna para el nombre completo -->
            <td> <!-- Columna para las acciones -->
                <a href="#" class="edit_button" data-id="${element._id}">Edit</a>
                <a href="#" class="delete_button" data-id="${element._id}">Delete</a>
            </td>
        `;
            item.setAttribute('data-id', element._id);
            container.appendChild(item)
        });

        assignEditEvents();
        assignDeleteEvents();

    }
}
// Función para asignar eventos a los botones "Delete"
function assignDeleteEvents() {
    document.querySelectorAll('.delete_button').forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const id = event.target.getAttribute('data-id');

            if (!id) {
                console.error("ID no encontrado");
                alert("Error: ID no encontrado.");
                return;
            }

            if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
                try {
                    const response = await fetch(`http://localhost:3001/restringido/${id}`, {
                        method: 'DELETE'
                    });

                    const result = await response.json();

                    if (response.ok) {
                        alert('Registro eliminado');
                        restringidoGet(); // Recargar la lista
                    } else {
                        console.error("Error en la respuesta del servidor:", result);
                        alert(`Error al eliminar: ${result.message || 'No se pudo eliminar'}`);
                    }
                } catch (error) {
                    console.error("Error en la petición DELETE:", error);
                    alert("Hubo un problema al conectar con el servidor.");
                }
            }
        });
    });
}

async function restringidoUpdate() {
    let restringido = {
        nombre_completo: document.getElementById('nombre_completo').value,
        numero: document.getElementById('numero').value,
        edad: document.getElementById('edad').value,
        pin: document.getElementById('pin').value,
        avatar: document.getElementById('avatar').value // Obtener la URL de la imagen
    }

    const id = document.getElementById('editId').value; // Obtener el ID del campo oculto

    if (!id) {
        alert("No se encontró el ID del usuario.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/restringido/${id}`, { // Pasar el ID en la URL
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restringido)
        });

        if (response.ok) {
            const updatedUser = await response.json();
            console.log('Usuario actualizado', updatedUser);
            alert('Usuario actualizado correctamente');
            window.location.href = "restringido.html";  // Aquí va la URL a la que deseas redirigir

        } else {
            const errorMessage = await response.text();
            alert(`Hubo un problema al actualizar el usuario: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario');
    }
}

function assignEditEvents() {
    document.querySelectorAll('.edit_button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la recarga de la página

            const id = button.getAttribute('data-id'); // Obtener el ID del atributo correcto

            if (!id) {
                console.error("No se encontró el ID en el botón de edición.");
                return;
            }

            console.log("Redirigiendo con ID:", id); // Verifica que el ID se obtiene correctamente
            window.location.href = `actualizarRestringido.html?id=${id}`;
        });
    });
}


async function restringidoPost() {
    let restringido = {
        nombre_completo: document.getElementById('nombre_completo').value,
        numero: document.getElementById('numero').value,
        edad: document.getElementById('edad').value,
        pin: document.getElementById('pin').value,
        avatar: document.getElementById('avatar').value
    }
    const response = await fetch("http://localhost:3001/restringido", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(restringido)
    });

    if (response && response.status == 201) {
        restringido = await response.json();
        console.log('Usuario restringido guardado', restringido);
        alert('Usuario restringido guardado');
        window.location.href = "restringido.html";  // Aquí va la URL a la que deseas redirigir

    } else {
        alert("Shit's on fire");
    }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosUsuario);