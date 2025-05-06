async function Verificar(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

    // Obtener el código ingresado y los datos del localStorage
    const codigoIngresado = document.getElementById("codigo").value;
    const codigoGuardado = localStorage.getItem("codigo2FA");
    const expiracionGuardada = localStorage.getItem("codigoExpira");

    // Verificar si los valores necesarios están presentes en localStorage
    if (!codigoGuardado || !expiracionGuardada) {
        alert("No se ha encontrado información de verificación.");
        return;
    }

    // Comprobar si el código ha expirado
    const now = Date.now();
    if (now > expiracionGuardada) {
        alert("El código ha expirado. Por favor, solicita uno nuevo.");
        return;
    }

    // Validar el código ingresado
    if (codigoIngresado === codigoGuardado) {
        alert("¡Código verificado correctamente!");
        
        // Redirigir al inicio (puedes cambiar esta URL a la que necesites)
        window.location.href = "inicio.html";
    } else {
        alert("El código ingresado es incorrecto.");
    }
}
