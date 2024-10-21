document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los elementos HTML
    const botonBuscar = document.getElementById('btnBuscar');

    function buscar() {
        const campoBusqueda = document.getElementById('inputBuscar').value.trim();
        const contenedor = document.getElementById('contenedor');

        const DATA_URL = "https://images-api.nasa.gov/search?q=" + encodeURIComponent(campoBusqueda.toLowerCase()); // vínculo API

        function Imagenes(data) {
            // desestructurar data
            let { items: elementos } = data.collection;
            if (elementos.length <= 0) {
                contenedor.innerHTML = `<p id="notfound">No se encontró nada que coincida con tu búsqueda.</p>`;
            } else {
                contenedor.innerHTML = ``;
                elementos.forEach(elemento => {
                    let { data: dataItem, links } = elemento;
                    let IMG = links ? links[0].href : "img/icons_backgrounds.png";
                    contenedor.innerHTML += `<div class="card">
                        <img src="${IMG}" class="card-img-top" alt="${dataItem[0].title}">
                        <div class="card-body">
                            <h5 class="card-title">${dataItem[0].title}</h5>
                            <p class="card-text">${dataItem[0].description}</p>
                            <p class="text-muted">${dataItem[0].date_created}</p>
                        </div>
                        </div>`;
                });
            }
        }

        function manejarRespuesta(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }

        function cargarImagenes() {
            fetch(DATA_URL)
                .then(manejarRespuesta)
                .then(Imagenes)
                .catch(error => {
                    console.error("Ocurrió un error:", error);
                    contenedor.innerHTML = `<p id="error">Ocurrió un error al cargar los datos.</p>`;
                });
        }

        cargarImagenes();
    }

    botonBuscar.addEventListener("click", buscar);
});