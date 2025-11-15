window.onload = function () {
    const languaje = new URLSearchParams(window.location.search).get("lang");
    if (!languaje) {
        let url = window.location.href;
        if (url.indexOf('?') > -1) {
            url += 'lang=ES'
        }
        else {
            url += '?lang=ES'
        }
        window.location.href = url;
        return;
    }


    const configLan = document.createElement('script');
    configLan.src = `conf/config${languaje}.json`;
    document.head.appendChild(configLan);

    configLan.onload = function () {
        aplicarConfiguracion();
        cargarPersonas();
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
        saludo.textContent = config.saludo + ',';
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

