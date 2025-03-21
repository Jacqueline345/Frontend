/**
 * búsqueda de videos
 * @param {*} query - texto de búsqueda
 * @param {*} playlistId - ID de la lista de reproducción
 * @returns {Promise<Array>} - Lista de videos que coinciden con la búsqueda
 */
async function buscarVideos(query, playlistId) {
    try{
        const response = await fetch(`http://localhost:3001/buscar?query=${query}&playlistId=${playlistId}`);
        const videos = await response.json();
        return videos;
    }catch (error){
        console.error('Error al buscar videos: ', error);
        return [];
    }
}
/**
 * Evento para realizar la búsqueda de videos
 */
document.getElementById('search-input').addEventListener('input', async function (event) {
    const query = event.target.value; //obtiene el texto de búsqueda
    const playlistId = localStorage.getItem('playlistId')//obtiene el playlistId desde el localStorage
    const videos =  await buscarVideos(query, playlistId); //realiza la búsqueda utilizando la función buscarVideos
    const container = document.getElementById('playlists-container'); //obtiene el contenedor donde se mostrarán los resultados
    container.innerHTML = ''; //limpia el contenedor

    //itera los videos obtenidos y crea elementos HTML para cada video
    videos.forEach(video => {
        const videoElement = document.createElement('a'); //crea un elemento de enlace para video
        videoElement.href = `video.html?videoId=${video.id}`; //establece la URL y redirige a video.html
        videoElement.classList.add('list-group-item', 'list-group-item-action'); //añade boostrap para utilizar el enlace
        // establece el contenido HTML del enlace, incluye titulo y descipción
        videoElement.innerHTML = `
            <h5 class="mb-1">${video.title}</h5>
            <p class="mb-1">${video.description}</p>
        `;
        container.appendChild(videoElement); //añade el enlace al contenedor
    });
});