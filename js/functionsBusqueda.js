/**
 * Buscar video
 */
async function searchVideos() {
    // Obtener el texto de búsqueda
    const searchText = document.getElementById('search-input').value.toLowerCase();

   try {
    const response = await fetch(`http://localhost:3001/search-videos?q=${searchText}`);
    const videos = await response.json();

    //Mostrar resultados
    displayResults(videos);
   } catch (error) {
    console.error('Error al buscar videos: ', error);
   }
}

/**
 * 
 * @param {*} videos 
 */
function displayResults(videos) {
    const container = document.getElementById('videos-container');
    container.innerHTML = ''; // Limpiar contenedor

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('list-group-item', 'list-group-item-action');
        videoElement.innerHTML = `
            <h5 class="mb-1">${video.title}</h5>
            <iframe width="560" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>
            <p class="mb-1">${video.description}</p>
            <button class="btn btn-warning btn-sm" onclick="editVideo('${video._id}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deleteVideo('${video._id}')">Eliminar</button>
        `;
        container.appendChild(videoElement);
    });
}