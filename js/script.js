document.addEventListener('DOMContentLoaded', () => {
    const BLACK_HOLE_API_URL = 'https://blackhole-api.vercel.app/data';

    // --- Datos de respaldo ---
    const fallbackBlackHoles = [
        { name: ["Sagitario A*"], type: "Supermasivo", solarmass: { text: "4.3 millones" }, distance: { ly: 26000 }, constellation: "Sagitario" },
        { name: ["M87*"], type: "Supermasivo", solarmass: { text: "6.5 mil millones" }, distance: { ly: 53500000 }, constellation: "Virgo" },
        { name: ["Cygnus X-1"], type: "Estelar", solarmass: { text: "21" }, distance: { ly: 6070 }, constellation: "Cygnus" },
        { name: ["V404 Cygni"], type: "Estelar", solarmass: { text: "9" }, distance: { ly: 7800 }, constellation: "Cygnus" },
        { name: ["Gargantua"], type: "Supermasivo", solarmass: { text: "100 millones" }, distance: { ly: 10000000 }, constellation: "Ficticio" },
        { name: ["TON 618"], type: "Ultramasivo", solarmass: { text: "66 mil millones" }, distance: { ly: 18200000000 }, constellation: "Canes Venatici" }
    ];

    // --- Mapeo de imágenes locales y GIFs ---
    const localImages = {
        "Sagitario A*": "img/sagitario.jpg",
        "M87*": "img/m87.jpg",
        "Cygnus X-1": "img/cygnus.jpg",
        "V404 Cygni": "gif/V404 Cygni.gif", 
        "Gargantua": "gif/Gargantua.gif", 
        "TON 618": "gif/Ton618.gif"       
    };

    // --- Función para obtener datos de la API de Agujeros Negros ---
    async function fetchBlackHoles() {
        try {
            const response = await fetch(BLACK_HOLE_API_URL);
            if (!response.ok) throw new Error('Error al obtener los datos');
            const blackHoles = await response.json();
            displayBlackHoles(blackHoles.slice(0, 6));
        } catch (error) {
            console.warn('Usando datos de respaldo:', error);
            displayBlackHoles(fallbackBlackHoles);
        }
    }

    // --- Función para renderizar las tarjetas ---
    function displayBlackHoles(blackHoles) {
        const listContainer = document.getElementById('black-hole-list');
        if (!listContainer) return;
        listContainer.innerHTML = ''; 

        blackHoles.forEach(bh => {
            const name = Array.isArray(bh.name) ? bh.name[0] : bh.name;
            const imageUrl = localImages[name] || bh.image || 'https://via.placeholder.com/300x200?text=Agujero+Negro';

            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${imageUrl}" alt="${name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=Imagen+no+disponible';">
                <div class="card-content">
                    <h3>${name}</h3>
                    <p><span class="label">Tipo:</span> ${bh.type || 'Desconocido'}</p>
                    <p><span class="label">Masa Solar:</span> ${bh.solarmass?.text || 'Desconocida'}</p>
                    <p><span class="label">Distancia:</span> ${bh.distance?.ly ? bh.distance.ly.toLocaleString() + ' años luz' : 'Desconocida'}</p>
                    <p><span class="label">Constelación:</span> ${bh.constellation || 'N/A'}</p>
                </div>
            `;

            // Lógica del clic en las tarjetas
            card.addEventListener('click', () => {
                if (name === "Sagitario A*") {
                    const infoSagitario = `<h3>Descubrimientos e Hitos</h3><ul><li><strong>Primera imagen:</strong> En mayo de 2022, la colaboración del Event Horizon Telescope (EHT) reveló la primera fotografía directa de su sombra.</li><li><strong>Estrellas en órbita:</strong> El seguimiento de estrellas cercanas como el grupo S demostró la existencia de este objeto masivo.</li><li><strong>Actividad pasada:</strong> Ha tenido episodios de actividad o "despertar" al consumir gas y materia en el pasado reciente.</li></ul>`;
                    openModal("Sagitario A*", infoSagitario);
                } else if (name === "M87*") {
                    const infoM87 = `<h3>Características Principales</h3><ul><li><strong>Masa:</strong> Aproximadamente 6.500 millones de veces la masa de nuestro Sol.</li><li><strong>Primera Fotografía Histórica:</strong> El 10 de abril de 2019, el EHT publicó la primera imagen directa de la sombra de un agujero negro.</li><li><strong>El Anillo Asimétrico:</strong> La imagen muestra un anillo brillante de gas caliente más luminoso en su parte sur.</li><li><strong>Chorro Relativista:</strong> Expulsa un colosal chorro de plasma energético hacia el espacio.</li></ul>`;
                    openModal("M87*", infoM87);
                } else if (name === "Cygnus X-1") {
                    const infoCygnus = `<h3>Características Principales</h3><ul><li><strong>Naturaleza:</strong> Binaria de rayos X con una supergigante azul (HDE 226868).</li><li><strong>Masa:</strong> Aproximadamente 21 veces la masa del Sol.</li><li><strong>Órbita:</strong> Completan una vuelta cada 5,6 días.</li><li><strong>Emisión de rayos X:</strong> El gas de la estrella forma un disco de acreción muy caliente.</li></ul>`;
                    openModal("Cygnus X-1", infoCygnus);
                } else if (name === "V404 Cygni") {
                    const infoV404 = `<img src="img/v404 cygni.jpg" alt="V404 Cygni" class="modal-image" onerror="this.style.display='none'"><h3>Características Principales</h3><ul><li><strong>Naturaleza:</strong> Sistema jerárquico triple (descubierto en 2024).</li><li><strong>Estallidos:</strong> Erupciones violentas cada varias décadas (1938, 1956, 1989, 2015).</li><li><strong>Chorros oscilantes:</strong> Emite chorros de plasma que oscilan por el efecto Lense-Thirring.</li><li><strong>Formación suave:</strong> Se formó por colapso directo sin gran explosión de supernova.</li></ul>`;
                    openModal("V404 Cygni", infoV404);
                } else if (name === "Gargantua") {
                    const infoGargantua = `<h3>Características Principales</h3><ul><li><strong>Masa:</strong> Unos 100 millones de veces la masa de nuestro Sol.</li><li><strong>Rotación extrema:</strong> Gira cerca del límite máximo permitido por la relatividad.</li><li><strong>Dilatación temporal:</strong> Una hora equivale a siete años terrestres.</li><li><strong>Base científica:</strong> Diseñado con asesoría del físico Kip Thorne.</li></ul>`;
                    openModal("Gargantua", infoGargantua);
                } else if (name === "TON 618") {
                    const infoTon618 = `<h3>Características Principales</h3><ul><li><strong>Masa descomunal:</strong> Unas 66.000 millones de veces la del Sol.</li><li><strong>Brillo extremo:</strong> Brilla con una potencia de 140 billones de soles.</li><li><strong>Distancia:</strong> A más de 10.400 millones de años luz.</li><li><strong>Tamaño gigante:</strong> Su horizonte de sucesos supera la órbita de los planetas exteriores.</li></ul>`;
                    openModal("TON 618", infoTon618);
                } else {
                    openModal(name, `<p>Más información sobre <strong>${name}</strong> próximamente...</p>`);
                }
            });

            listContainer.appendChild(card);
        });
    }

    // --- Lógica para el GIF de Colisión (Intro) ---
    const collisionGif = document.getElementById('collision-gif');
    if (collisionGif) {
        collisionGif.addEventListener('click', () => {
            const audio = new Audio('mp3/black.mp3');
            audio.play().catch(e => console.log("El navegador bloqueó el audio hasta que haya interacción:", e));
            
            const infoColision = `
                <p>Una colisión de agujeros negros es la fusión de dos de estos objetos masivos que libera una enorme cantidad de energía en forma de ondas gravitacionales.</p>
                <h4>Fases del proceso</h4>
                <ul>
                    <li><strong>Órbita y aproximación:</strong> Dos agujeros negros giran en espiral el uno alrededor del otro debido a la atracción mutua.</li>
                    <li><strong>Emisión de energía:</strong> Mientras se acercan, pierden energía al distorsionar el espaciotiempo, lo que produce ondas gravitacionales.</li>
                    <li><strong>Fusión:</strong> Se unen en un solo agujero negro cuya masa final es ligeramente menor que la suma de ambos, ya que parte de la masa se convierte en energía pura.</li>
                </ul>
                <h4>Detección y registros</h4>
                <p>Los científicos detectan estos choques cósmicos mediante observatorios avanzados como LIGO y Virgo, los cuales captan las vibraciones del espaciotiempo. Eventos notables como GW190521 han desafiado los modelos astrofísicos tradicionales sobre el tamaño de estos objetos.</p>
            `;
            openModal("Colisión de Agujeros Negros", infoColision);
        });
    }

    // --- Lógica para la Espaguetización ---
    const spaghettificationImg = document.getElementById('spaghettification-img');
    if (spaghettificationImg) {
        spaghettificationImg.addEventListener('click', () => {
            const infoEspaguetizacion = `
                <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">La espaguetización es el estiramiento extremo de un objeto en una forma fina y delgada, parecida a un fideo, debido a las intensas y desiguales fuerzas de marea cerca de un agujero negro.</p>
                <h3 style="color: #ff8c42; margin-bottom: 1rem;">¿Cómo se produce?</h3>
                <ul>
                    <li><strong>Gravedad extrema:</strong> La masa del agujero negro está tan concentrada que genera un campo gravitatorio inmenso.</li>
                    <li><strong>Fuerzas de marea:</strong> Si caes de pie, la gravedad tira con mucha más fuerza de tus pies que de tu cabeza.</li>
                    <li><strong>Estiramiento y compresión:</strong> Esa diferencia de atracción estira el cuerpo verticalmente y lo comprime de forma lateral.</li>
                    <li><strong>Destrucción total:</strong> Ningún material conocido puede soportar esta tensión, por lo que la estructura se desgarra a nivel atómico.</li>
                </ul>
            `;
            openModal("Espaguetización", infoEspaguetizacion);
        });
    }

    // --- Funciones del Modal ---
    window.openModal = function(title, content) {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-body').innerHTML = content;
        document.getElementById('info-modal').classList.add('active');
    }

    window.closeModal = function() {
        document.getElementById('info-modal').classList.remove('active');
    }

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('info-modal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Función para la API de la NASA (APOD) con TU CLAVE ---
    async function fetchAPOD() {
        // AQUÍ ESTÁ TU CLAVE PERSONAL INTEGRADA
        const APOD_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

        try {
            const response = await fetch(APOD_API_URL);
            if (!response.ok) throw new Error('Error NASA');
            const data = await response.json();
            const apodContainer = document.getElementById('apod-container');
            
            if (apodContainer) {
                if (data.media_type === 'image') {
                    apodContainer.innerHTML = `
                        <img src="${data.url}" alt="${data.title}">
                        <p style="margin-top: 1rem; font-size: 0.9rem; color: #ccc;">${data.title} - ${data.explanation}</p>
                    `;
                } else {
                    apodContainer.innerHTML = `<p>La imagen de hoy es un video. <a href="${data.url}" target="_blank" style="color: #4da6ff;">Ver aquí</a>.</p>`;
                }
            }
        } catch (error) {
            console.warn('Error con la API de NASA. Usando imagen de respaldo:', error);
            const apodContainer = document.getElementById('apod-container');
            if (apodContainer) {
                // Respaldo en caso de fallo
                apodContainer.innerHTML = `
                    <img src="img/objeto-negro.avif" alt="Imagen de respaldo">
                    <p style="margin-top: 1rem; font-size: 0.9rem; color: #ccc;">No se pudo conectar con la NASA en este momento. Mostrando imagen local de respaldo.</p>
                `;
            }
        }
    }

    // --- Inicializar ---
    fetchBlackHoles();
    fetchAPOD();
});