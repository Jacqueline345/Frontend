/**
 * búsqueda de videos
 * @param {*} query - texto de búsqueda
 * @param {*} playlistId - ID de la lista de reproducción
 * @returns {Promise<Array>} - Lista de videos que coinciden con la búsqueda
 */
async function buscarVideos(query) {
    try {
        const response = await fetch(`http://localhost:3001/buscar?query=${query}`);
        const videos = await response.json();
        return Array.isArray(videos) ? videos : [];
    } catch (error) {
        console.error('Error al buscar videos: ', error);
        return [];
    }
}
/**
 * Evento para realizar la búsqueda de videos
 */
document.getElementById('search-input').addEventListener('keyup', async function (event) {
    const query = event.target.value; // obtiene el texto de búsqueda
    const videos = await buscarVideos(query); // realiza la búsqueda utilizando la función buscarVideos
    const container = document.getElementById('videos-container'); // obtiene el contenedor donde se mostrarán los resultados
    container.innerHTML = ''; // limpia el contenedor

    // itera los videos obtenidos y crea elementos HTML para cada video
    videos.forEach(video => {
        const videoElement = document.createElement('div'); // crea un elemento div para el video
        videoElement.classList.add('list-group-item', 'list-group-item-action'); // añade Bootstrap para utilizar el enlace
        // establece el contenido HTML del div, incluye título, descripción y el iframe del video
        videoElement.innerHTML = `
            <h5 class="mb-1">${video.title}</h5>
            <iframe width="560" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>
            <p class="mb-1">${video.description}</p>
            <button class="btn btn-warning btn-sm" onclick="editVideo('${video._id}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteVideo('${video._id}')">Eliminar</button>
        `;
        container.appendChild(videoElement); // añade el div al contenedor
    });
});