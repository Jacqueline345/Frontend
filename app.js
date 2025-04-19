const error = (e) => console.log(e.target.responseText);

function UsuarioCreated() {
    alert ("Usuario creado correctamente");
}

function saveUsuario(){
    const ajaxRequest = new XMLHttpRequest();
    token = sessionStorage.getItem('token');
    ajaxRequest.addEventListener("load", UsuarioCreated);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", "http://localhost:4000/graphql");    
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.setRequestHeader("Authorization", `Bearer ${token}`);
    const data = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        telefono: document.getElementById('telefono').value,
        correos: document.getElementById('correos').value,
        nacimiento: document.getElementById('nacimiento').value,
        pais: document.getElementById('pais').value,
        contrasena: document.getElementById('contrasena').value,
        pin: document.getElementById('pin').value
    };
    ajaxRequest.send(JSON.stringify(data));
}