window.onload = function () {
    const languaje = new URLSearchParams(window.location.search).get("lang");
    if (!languaje) {
        let url = window.location.href;
        if (url.indexOf('?') > -1) {
            url += '&lang=ES'
        }
        else {
            url += '?lang=ES'
        }
        window.history.replaceState(null, '', url);

    }

    const configLan = document.createElement('script');
    configLan.src = `conf/config${languaje || 'ES'}.json`;
    document.head.appendChild(configLan);

    configLan.onload = function () {
        aplicarConfiguracion();
        if (typeof perfiles !== 'undefined') {
            cargarPerfiles(perfiles);
            inicializarBusqueda();
        }
    };
}


function aplicarConfiguracion() {
    if (config.sitio && Array.isArray(config.sitio)) {
        document.title = config.sitio.join('');

        const logo = document.getElementById('logo');
        if (logo) {
            logo.innerHTML = `${config.sitio[0]}<span>${config.sitio[1]}</span>${config.sitio[2]}`;
        }
    }

    const saludo = document.getElementById('saludo');
    if (saludo && config.saludo) {
        saludo.textContent = config.saludo + ', Gustavo Berne';
    }

    const busqueda = document.getElementById('busqueda');
    if (busqueda && config.buscar) {
        busqueda.placeholder = config.nombre + '...';
    }

    const footer = document.querySelector('footer');
    if (footer && config.copyRight) {
        footer.textContent = config.copyRight;
    }


    const botonBusqueda = document.querySelector('button[type="submit"]');
    if (botonBusqueda && config.buscar) {
        botonBusqueda.textContent = config.buscar;
    }
}

function cargarPerfiles(perfiles) {
    const gallery = document.querySelector('.gallery');

    perfiles.forEach(perfil => {
        const galleryItem = document.querySelector('#galleryItem').content.cloneNode(true);
        galleryItem.querySelector('a').setAttribute('href', `perfil.html?ci=${perfil.ci}`)
        galleryItem.querySelector('.galleryimg').setAttribute('src', `${perfil.imagen}`);
        galleryItem.querySelector('label').innerHTML = `${perfil.nombre}`;
        gallery.appendChild(galleryItem);
    });
}



function filtrarEstudiantes(query) {
    const gallery = document.querySelector('.gallery');
    const items = gallery.querySelectorAll('li');
    let resultados = 0;

    const queryLower = query.toLowerCase();

    items.forEach(item => {
        const label = item.querySelector('label');
        const nombre = label ? label.textContent.toLowerCase() : '';

        if (nombre.includes(queryLower)) {
            item.style.display = '';
            resultados++;
        } else {
            item.style.display = 'none';
        }
    });

    mostrarMensajeNoResultados(query, resultados, gallery);
}


function mostrarMensajeNoResultados(query, resultados, contenedor) {
    const mensajeAnterior = contenedor.querySelector('.no-resultados');
    if (mensajeAnterior) {
        mensajeAnterior.remove();
    }

    if (resultados === 0 && query.trim() !== '') {
        const mensaje = document.createElement('p');
        mensaje.className = 'no-resultados';
        mensaje.textContent = `${config.noResultados || 'No hay alumnos que tengan en su nombre'}: ${query}`;
        contenedor.appendChild(mensaje);
    }
}


function inicializarBusqueda() {
    const formulario = document.querySelector('form');
    const inputBusqueda = document.getElementById('busqueda');

    if (formulario && inputBusqueda) {
        formulario.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = inputBusqueda.value.trim();
            filtrarEstudiantes(query);
        });
    }
}