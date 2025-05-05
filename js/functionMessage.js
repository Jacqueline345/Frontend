async function enviarCodigo() {
    try {
        const response = await fetch('http://localhost:3001/enviar-codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) // No necesitas enviar el código desde el cliente
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Código enviado:', data);
    } catch (error) {
        console.error('Error al enviar el código:', error);
    }
}

document.querySelector('button[type="button"]').onclick = enviarCodigo;
