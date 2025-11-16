window.onload = function () {
    const parametros = new URLSearchParams(window.location.search);
    const ci = parametros.get('ci');
    const languaje = parametros.get('lang');

    if (!languaje) {
        let url = window.location.href;
        if (url.indexOf('?') > -1) {
            url += '&lang=ES';
        } else {
            url += '?lang=ES';
        }
        window.history.replaceState(null, '', url);

    }

    const configLan = document.createElement('script');
    configLan.src = `conf/config${languaje || 'ES'}.json`;
    document.head.appendChild(configLan);

    const scriptPerfil = document.createElement('script');
    scriptPerfil.src = `${ci}/perfil.json`;
    document.head.appendChild(scriptPerfil);

    scriptPerfil.onload = function () {
        mostrarPerfil(perfil, ci);
    };
}

function mostrarPerfil(perfil, ci) {
    document.title = `${perfil.nombre} - ${config.sitio.join('')}`;


    document.querySelector('h1').textContent = perfil.nombre;
    document.querySelector('p1').textContent = perfil.descripcion || '';

    const tds = document.querySelectorAll('td');
    if (tds.length >= 8) {
        tds[0].textContent = config.color + ':';
        tds[1].textContent = perfil.color || '';

        tds[2].textContent = config.libro + ':';
        tds[3].textContent = Array.isArray(perfil.libro) ? perfil.libro.join(', ') : perfil.libro || '';

        tds[4].textContent = config.musica + ':';
        tds[5].textContent = Array.isArray(perfil.musica) ? perfil.musica.join(', ') : perfil.musica || '';

        tds[6].textContent = config.video_juego + ':';
        tds[7].textContent = Array.isArray(perfil.video_juego) ? perfil.video_juego.join(', ') : perfil.video_juego || '';
    }


    const lenguajesTds = document.querySelectorAll('#lenguajes');
    if (lenguajesTds.length >= 2) {
        lenguajesTds[0].textContent = config.lenguajes + ':';
        lenguajesTds[1].textContent = Array.isArray(perfil.lenguajes) ? perfil.lenguajes.join(', ') : perfil.lenguajes || '';
    }

    const correoLink = document.querySelector('#correo');
    if (correoLink && perfil.email) {
        correoLink.href = `mailto:${perfil.email}`;
        correoLink.textContent = config.email.replace('[email]', perfil.email);
    }


    const container = document.getElementById('container');
    const imagen = document.createElement('img');
    imagen.src = `${ci}/${ci}.jpg`;
    imagen.alt = perfil.nombre;
    imagen.className = 'foto-perfil';
    container.insertBefore(imagen, container.firstChild);
}