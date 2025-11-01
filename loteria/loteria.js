// loteria.js
const CARTAS = [
    // Columna 1
    "EL GALLO", "EL DIABLITO", "LA DAMA", "EL CATRÍN", "EL PARAGUAS", "LA SIRENA", "LA ESCALERA", "LA BOTELLA", "EL BARRIL", "EL ÁRBOL", "EL MELÓN", "EL VALIENTE", "EL GORRITO", "LA MUERTE",
    // Columna 2
    "LA PERA", "LA BANDERA", "EL BANDOLÓN", "EL VIOLONCELLO", "LA GARZA", "EL PÁJARO", "LA MANO", "LA BOTA", "LA LUNA", "EL COTORRO", "EL BORRACHO", "EL NEGRITO", "EL CORAZÓN", "LA SANDÍA",
    // Columna 3
    "EL TAMBOR", "EL CAMARÓN", "LAS JARAS", "EL MÚSICO", "LA ARAÑA", "EL SOLDADO", "LA ESTRELLA", "EL CAZO", "EL MUNDO", "EL APACHE", "EL NOPAL", "EL ALACRÁN", "LA ROSA", "LA CALAVERA",
    // Columna 4
    "LA CAMPANA", "EL CANTARITO", "EL VENADO", "EL SOL", "LA CORONA", "LA CHALUPA", "EL PINO", "EL PESCADO", "LA PALMA", "LA MACETA", "LA ARPA", "LA RANA"
];

// URLs de imágenes
const CARTAS_IMAGENES = {
    "EL GALLO": "https://i.ibb.co/yBm513qg/EL-GALLO.jpg",
    "LA PERA": "https://i.ibb.co/Y457kCNQ/LA-PERA.jpg",
    "EL TAMBOR": "https://i.ibb.co/bnHSkK2/EL-TAMBOR.jpg",
    "LA CAMPANA": "https://i.ibb.co/spmj2QyD/LA-CAMPANA.jpg",
    "EL DIABLITO": "https://i.ibb.co/HDmwQ13k/EL-DIABLITO.jpg",
    "LA BANDERA": "https://i.ibb.co/G3tcJ3Qw/LA-BANDERA.jpg",
    "EL CAMARÓN": "https://i.ibb.co/SXJZQqHZ/EL-CAMARON.jpg",
    "EL CANTARITO": "https://i.ibb.co/3mXs4sm9/EL-CANTARITO.jpg",
    "LA DAMA": "https://i.ibb.co/C3WSD6yS/LA-DAMA.jpg",
    "EL BANDOLÓN": "https://i.ibb.co/KpHm1GkK/EL-BANDOLON.jpg",
    "LAS JARAS": "https://i.ibb.co/Dfs1s58B/LAS-JARAS.jpg",
    "EL VENADO": "https://i.ibb.co/230HbZTV/EL-VENADO.jpg",
    "EL CATRÍN": "https://i.ibb.co/YBqWdDRW/EL-CATRIN.jpg",
    "EL VIOLONCELLO": "https://i.ibb.co/HLzgXxS6/EL-VIOLONCELLO.jpg",
    "EL MÚSICO": "https://i.ibb.co/ycn2bV6h/EL-MUSICO.jpg",
    "EL SOL": "https://i.ibb.co/93n4gWJX/EL-SOL.jpg",
    "EL PARAGUAS": "https://i.ibb.co/mC2fg5CM/EL-PARAGUAS.jpg",
    "LA GARZA": "https://i.ibb.co/gZD5skcB/LA-GARZA.jpg",
    "LA ARAÑA": "https://i.ibb.co/HTqD8pP2/LA-ARANA.jpg",
    "LA CORONA": "https://i.ibb.co/6cTj706Z/LA-CORONA.jpg",
    "LA SIRENA": "https://i.ibb.co/Q7kpqBrR/LA-SIRENA.jpg",
    "EL PÁJARO": "https://i.ibb.co/NdNXvFTk/EL-PAJARO.jpg",
    "EL SOLDADO": "https://i.ibb.co/NgCgJ8Tf/EL-SOLDADO.jpg",
    "LA CHALUPA": "https://i.ibb.co/1fwcH0zr/LA-CHALUPA.jpg",
    "LA ESCALERA": "https://i.ibb.co/Kx6Wns7Y/LA-ESCALERA.jpg",
    "LA MANO": "https://i.ibb.co/PZb49PXB/LA-MANO.jpg",
    "LA ESTRELLA": "https://i.ibb.co/cKSXjW7f/LA-ESTRELLA.jpg",
    "EL PINO": "https://i.ibb.co/QFbCyN9r/EL-PINO.jpg",
    "LA BOTELLA": "https://i.ibb.co/TB6PjFPK/LA-BOTELLA.jpg",
    "LA BOTA": "https://i.ibb.co/5X203xH2/LA-BOTA.jpg",
    "EL CAZO": "https://i.ibb.co/CKq5fyqf/EL-CAZO.jpg",
    "EL PESCADO": "https://i.ibb.co/5XPM1dgX/EL-PESCADO.jpg",
    "EL BARRIL": "https://i.ibb.co/0yy6DVSH/EL-BARRIL.jpg",
    "LA LUNA": "https://i.ibb.co/ks4NMj32/LA-LUNA.jpg",
    "EL MUNDO": "https://i.ibb.co/4ZByNtVL/EL-MUNDO.jpg",
    "LA PALMA": "https://i.ibb.co/8WLRx7X/LA-PALMA.jpg",
    "EL ÁRBOL": "https://i.ibb.co/8nYD2XY3/EL-ARBOL.jpg",
    "EL COTORRO": "https://i.ibb.co/WNvSBZ8f/EL-COTORRO.jpg",
    "EL APACHE": "https://i.ibb.co/C3DJDfDV/EL-APACHE.jpg",
    "LA MACETA": "https://i.ibb.co/Gf42NhM8/LA-MACETA.jpg",
    "EL MELÓN": "https://i.ibb.co/KzbwgZFW/EL-MELON.jpg",
    "EL BORRACHO": "https://i.ibb.co/b5HkZFVR/EL-BORRACHO.jpg",
    "EL NOPAL": "https://i.ibb.co/HpXZYDgJ/EL-NOPAL.jpg",
    "EL ARPA": "https://i.ibb.co/35Jxddt7/EL-ARPA.jpg",
    "EL VALIENTE": "https://i.ibb.co/JRcbyDdM/EL-VALIENTE.jpg",
    "EL NEGRITO": "https://i.ibb.co/cKkDqtFm/EL-NEGRITO.jpg",
    "EL ALACRÁN": "https://i.ibb.co/23FFxH87/EL-ALACRAN.jpg",
    "LA RANA": "https://i.ibb.co/SXhZF4Vr/LA-RANA.jpg",
    "EL GORRITO": "https://i.ibb.co/gZHw0X3k/EL-GORRITO.jpg",
    "EL CORAZÓN": "https://i.ibb.co/W4f2Yg6H/EL-CORAZON.jpg",
    "LA ROSA": "https://i.ibb.co/ccRdZLqy/LA-ROSA.jpg",
    "LA MUERTE": "https://i.ibb.co/FqJq6Z63/LA-MUERTE.jpg",
    "LA SANDÍA": "https://i.ibb.co/tTvKjmty/LA-SANDIA.jpg",
    "LA CALAVERA": "https://i.ibb.co/qYNV3ZYW/LA-CALAVERA.jpg"
};

// Estado global
window.appState = {
    currentUser: null,
    isAdmin: false,
    userHasConfirmed: false
};

let selecciones = {};
let tempSelections = new Set();
let config = { tablaCerrada: false, cartasPorUsuario: 2 };

// === VARIABLES DEL GENERADOR ===
let mazoMezclado = [];
let indiceCartaActual = 0;
let cartasGeneradas = [];
let ultimaCarta = null;
let generadorInicializado = false;
let generadorAutoInterval = null;
let generadorAutoActivo = false;

// === POLLING EN TIEMPO REAL ===
let pollingInterval = null;

function startPolling() {
    if (pollingInterval) return;
    pollingInterval = setInterval(async () => {
        try {
            const nuevasSelecciones = await fetchGistFile('selecciones.json');
            const nuevasStr = JSON.stringify(nuevasSelecciones);
            const actualesStr = JSON.stringify(selecciones);
            if (nuevasStr !== actualesStr) {
                selecciones = nuevasSelecciones;
                renderTable();
            }
            const nuevaConfig = await fetchGistFile('config.json');
            if (JSON.stringify(nuevaConfig) !== JSON.stringify(config)) {
                config = nuevaConfig;
                updateAdminPanel();
            }
            // Actualizar estado de confirmación del usuario actual
            if (window.appState.currentUser) {
                const userLower = window.appState.currentUser.toLowerCase();
                const userCardCount = Object.values(selecciones).filter(owner =>
                    owner && owner.toLowerCase() === userLower
                ).length;
                const maxCartas = config.cartasPorUsuario || 2;
                window.appState.userHasConfirmed = userCardCount >= maxCartas;
                updateConfirmButton();
            }
        } catch (err) {
            console.warn('No se pudo actualizar en tiempo real:', err.message);
        }
    }, 8000);
}

function stopPolling() {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
}

// === API ===
async function fetchGistFile(filename) {
    const res = await fetch(`${window.APP_CONFIG.API_BASE}/read/${filename}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
}

async function updateGist(files) {
    const res = await fetch(`${window.APP_CONFIG.API_BASE}/write`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(files)
    });
    if (!res.ok) throw new Error('Error en backend');
}

// === FUNCIONES AUXILIARES ===
function getSavedCardsCount() {
    if (!window.appState.currentUser) return 0;
    const userLower = window.appState.currentUser.toLowerCase();
    return Object.values(selecciones).filter(owner =>
        owner && owner.toLowerCase() === userLower
    ).length;
}

function getMaxSelectableCards() {
    const saved = getSavedCardsCount();
    const maxTotal = config.cartasPorUsuario || 2;
    return Math.max(0, maxTotal - saved);
}

// === RENDER ===
function renderTable() {
    const desktop = document.querySelector('.desktop-table');
    if (desktop) {
        desktop.innerHTML = '';
        const desktopTable = createDesktopTable();
        desktop.appendChild(desktopTable);
    }
    const mobile = document.querySelector('.mobile-table');
    if (mobile) {
        mobile.innerHTML = '';
        const mobileTable = createMobileTable();
        mobile.appendChild(mobileTable);
    }
    document.querySelectorAll('.player-cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    if (window.appState.isAdmin) {
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', handleRemove);
        });
    }
    updateConfirmButton();

    // ✅ Actualizar contadores de tabla
    const selectedCount = Object.keys(selecciones).filter(carta => selecciones[carta] !== undefined && selecciones[carta] !== null).length;
    document.getElementById('cards-selected-count').textContent = selectedCount;
    document.getElementById('cards-available-count').textContent = 54 - selectedCount;
}

// === TABLA DE ESCRITORIO ===
function createDesktopTable() {
    const table = document.createElement('table');
    table.className = 'desktop-cards-table';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    for (let i = 0; i < 4; i++) {
        const thCarta = document.createElement('th');
        thCarta.textContent = 'Carta';
        headerRow.appendChild(thCarta);
        const thJugador = document.createElement('th');
        thJugador.textContent = 'Jugador';
        headerRow.appendChild(thJugador);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    const numFilas = 14;
    const numColumnas = 4;
    for (let fila = 0; fila < numFilas; fila++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < numColumnas; col++) {
            const index = fila + col * numFilas;
            if (index < CARTAS.length) {
                const carta = CARTAS[index];
                const cartaCell = document.createElement('td');
                cartaCell.className = 'number-cell pink-bg';
                cartaCell.textContent = carta;
                cartaCell.dataset.card = carta;
                tr.appendChild(cartaCell);
                const jugadorCell = document.createElement('td');
                jugadorCell.className = 'player-cell';
                jugadorCell.dataset.card = carta;
                let jugador = selecciones[carta] || '—';
                if (window.appState.currentUser &&
                    ((window.appState.userHasConfirmed && selecciones[carta] &&
                        selecciones[carta].toLowerCase() === window.appState.currentUser.toLowerCase()) ||
                        tempSelections.has(carta))) {
                    jugador = window.appState.currentUser;
                }
                jugadorCell.textContent = jugador;
                if (window.appState.isAdmin && jugador !== '—') {
                    jugadorCell.innerHTML = `${jugador} <span class="remove-btn" data-card="${carta}">×</span>`;
                }
                tr.appendChild(jugadorCell);
            } else {
                const emptyCarta = document.createElement('td');
                emptyCarta.className = 'number-cell pink-bg';
                emptyCarta.textContent = '';
                tr.appendChild(emptyCarta);
                const emptyJugador = document.createElement('td');
                emptyJugador.className = 'player-cell';
                emptyJugador.textContent = '';
                tr.appendChild(emptyJugador);
            }
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return table;
}

// === TABLA MÓVIL ===
function createMobileTable() {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead><tr><th>Carta</th><th>Jugador</th></tr></thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');
    CARTAS.forEach(carta => {
        let jugador = selecciones[carta] || '—';
        if (window.appState.currentUser &&
            ((window.appState.userHasConfirmed && selecciones[carta] &&
                selecciones[carta].toLowerCase() === window.appState.currentUser.toLowerCase()) ||
                tempSelections.has(carta))) {
            jugador = window.appState.currentUser;
        }
        let celdaJugador = jugador;
        if (window.appState.isAdmin && jugador !== '—') {
            celdaJugador = `${jugador} <span class="remove-btn" data-card="${carta}">×</span>`;
        }
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="number-cell pink-bg">${carta}</td>
            <td class="player-cell" data-card="${carta}">${celdaJugador}</td>
        `;
        tbody.appendChild(row);
    });
    return table;
}

// === MANEJADORES ===
function handleCellClick(e) {
    const carta = e.currentTarget.dataset.card;
    const currentOwner = selecciones[carta];
    if (currentOwner && window.appState.currentUser &&
        currentOwner.toLowerCase() !== window.appState.currentUser.toLowerCase()) {
        showUserCardsModal(currentOwner);
        return;
    }
    if (currentOwner && window.appState.currentUser &&
        currentOwner.toLowerCase() === window.appState.currentUser.toLowerCase()) {
        if (!window.appState.userHasConfirmed) {
            tempSelections.delete(carta);
            renderTable();
            updateConfirmButton();
        }
        return;
    }
    if (config.tablaCerrada) {
        document.getElementById('table-closed-modal')?.classList.remove('hidden');
        return;
    }
    if (!window.appState.currentUser) {
        document.getElementById('login-required-modal').classList.remove('hidden');
        return;
    }
    if (window.appState.userHasConfirmed) {
        document.getElementById('cards-locked-modal').classList.remove('hidden');
        return;
    }
    const maxSelectable = getMaxSelectableCards();
    if (tempSelections.has(carta)) {
        tempSelections.delete(carta);
    } else {
        if (tempSelections.size >= maxSelectable) {
            alert(`Ya tienes ${config.cartasPorUsuario - maxSelectable} carta(s) seleccionada(s). Solo puedes seleccionar ${maxSelectable} más.`);
            return;
        }
        tempSelections.add(carta);
    }
    renderTable();
    updateConfirmButton();
}

function showUserCardsModal(owner) {
    const userCards = Object.entries(selecciones)
        .filter(([carta, user]) => user === owner)
        .map(([carta]) => carta);
    const message = userCards.length > 0
        ? `El usuario <strong>${owner}</strong> ha seleccionado: <strong>${userCards.join(' y ')}</strong>`
        : `El usuario <strong>${owner}</strong> no tiene cartas seleccionadas.`;
    document.getElementById('user-cards-message').innerHTML = message;
    const copyBtn = document.getElementById('copy-cards-btn');
    copyBtn.onclick = () => {
        const textToCopy = userCards.join('-');
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyBtn.textContent = '✅ ¡Copiado!';
            setTimeout(() => {
                copyBtn.textContent = '📋 Copiar';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    };
    document.getElementById('user-cards-modal').classList.remove('hidden');
}

function handleRemove(e) {
    e.stopPropagation();
    const carta = e.target.dataset.card;
    if (confirm(`¿Eliminar a ${selecciones[carta]} de ${carta}?`)) {
        delete selecciones[carta];
        saveSelections();
    }
}

function updateConfirmButton() {
    const confirmDiv = document.getElementById('confirm-selection');
    const display = document.getElementById('selected-cards-display');
    const savedCount = getSavedCardsCount();
    const totalSelected = savedCount + tempSelections.size;
    if (tempSelections.size > 0 && window.appState.currentUser && !window.appState.userHasConfirmed) {
        const allSelected = Array.from(tempSelections);
        Object.entries(selecciones).forEach(([carta, owner]) => {
            if (owner && owner.toLowerCase() === window.appState.currentUser.toLowerCase()) {
                allSelected.push(carta);
            }
        });
        display.textContent = allSelected.join(', ');
        confirmDiv.classList.remove('hidden');
    } else {
        confirmDiv.classList.add('hidden');
    }
}

async function confirmSelection() {
    if (!window.appState.currentUser) {
        alert('Sesión inválida. Por favor, inicia sesión nuevamente.');
        return;
    }
    const savedCount = getSavedCardsCount();
    const totalNeeded = (config.cartasPorUsuario || 2) - savedCount;
    if (tempSelections.size !== totalNeeded) {
        alert(`Debes seleccionar exactamente ${totalNeeded} carta(s) adicional(es).`);
        return;
    }
    for (const carta of tempSelections) {
        if (selecciones[carta] &&
            selecciones[carta].toLowerCase() !== window.appState.currentUser.toLowerCase()) {
            alert(`La carta "${carta}" ya está ocupada por otro usuario.`);
            return;
        }
    }
    for (const carta of tempSelections) {
        selecciones[carta] = window.appState.currentUser;
    }
    window.appState.userHasConfirmed = true;
    await saveSelections();
    tempSelections.clear();
    updateConfirmButton();
}

async function saveSelections() {
    try {
        await updateGist({ 'selecciones.json': { content: JSON.stringify(selecciones, null, 2) } });
        renderTable();
    } catch (err) {
        alert('❌ Error al guardar: ' + err.message);
        console.error(err);
    }
}

async function saveConfig() {
    try {
        await updateGist({ 'config.json': { content: JSON.stringify(config, null, 2) } });
    } catch (err) {
        alert('❌ Error al guardar configuración: ' + err.message);
        console.error(err);
    }
}

// === GENERADOR SIN REPETICIÓN ===
function reiniciarMazo() {
    mazoMezclado = [...Object.keys(CARTAS_IMAGENES)];
    for (let i = mazoMezclado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazoMezclado[i], mazoMezclado[j]] = [mazoMezclado[j], mazoMezclado[i]];
    }
    indiceCartaActual = 0;
}

function obtenerSiguienteCarta() {
    if (indiceCartaActual >= mazoMezclado.length) {
        return null;
    }
    return mazoMezclado[indiceCartaActual++];
}

function mostrarCartaActual(carta) {
    const img = document.getElementById('current-card-img');
    const name = document.getElementById('current-card-name');
    const placeholder = document.getElementById('generator-placeholder');
    const finJuego = document.getElementById('fin-juego');
    img.src = CARTAS_IMAGENES[carta];
    img.alt = carta;
    img.style.display = 'block';
    name.textContent = carta;
    name.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
    if (finJuego) finJuego.style.display = 'none';
    ultimaCarta = carta;
    document.getElementById('last-card-text').textContent = carta;
}

function mostrarFinJuego() {
    const img = document.getElementById('current-card-img');
    const name = document.getElementById('current-card-name');
    const placeholder = document.getElementById('generator-placeholder');
    const finJuego = document.getElementById('fin-juego');
    if (img) img.style.display = 'none';
    if (name) name.style.display = 'none';
    if (placeholder) placeholder.style.display = 'none';
    if (finJuego) finJuego.style.display = 'block';
}

function agregarMiniatura(carta) {
    const grid = document.getElementById('miniatures-grid');
    const miniatura = document.createElement('div');
    miniatura.className = 'miniature-card';
    miniatura.innerHTML = `
        <img src="${CARTAS_IMAGENES[carta]}" alt="${carta}">
        <div>${carta}</div>
    `;
    grid.prepend(miniatura);
}

async function subirCapturaCartas() {
    const grid = document.getElementById('miniatures-grid');
    if (!grid || grid.children.length === 0) {
        alert('No hay cartas generadas para subir.');
        return;
    }
    const linkContainer = document.getElementById('screenshot-link-container');
    const linkInput = document.getElementById('screenshot-link');
    const copyBtn = document.getElementById('copy-screenshot-link');
    const captureBtn = document.getElementById('capture-screenshot-btn');
    try {
        captureBtn.disabled = true;
        captureBtn.textContent = '📤 Subiendo...';
        const canvas = await html2canvas(grid, {
            backgroundColor: '#f5f5f5',
            scale: 2,
            useCORS: true
        });
        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('image', blob, 'cartas-loteria.png');
            // ⚠️ REEMPLAZA "TU_CLAVE_IMGBB" POR TU API KEY REAL
            const response = await fetch('https://api.imgbb.com/1/upload?key=9979891f16223fc79a7d5dfa7a42d526', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                const imageUrl = result.data.url;
                linkInput.value = imageUrl;
                linkContainer.classList.remove('hidden');
                copyBtn.onclick = async () => {
                    await navigator.clipboard.writeText(imageUrl);
                    copyBtn.textContent = '✅ ¡Copiado!';
                    setTimeout(() => {
                        copyBtn.textContent = '📋 Copiar';
                    }, 2000);
                };
            } else {
                throw new Error(result.error?.message || 'Error al subir');
            }
        }, 'image/png');
    } catch (err) {
        console.error('Error:', err);
        alert('❌ Error al subir la imagen: ' + (err.message || 'intente nuevamente'));
    } finally {
        captureBtn.disabled = false;
        captureBtn.textContent = '📤 Subir cartas';
    }
}

function reiniciarGenerador() {
    detenerGeneradorAutomatico();
    reiniciarMazo();
    cartasGeneradas = [];
    ultimaCarta = null;
    const grid = document.getElementById('miniatures-grid');
    if (grid) grid.innerHTML = '';
    const placeholder = document.getElementById('generator-placeholder');
    const img = document.getElementById('current-card-img');
    const name = document.getElementById('current-card-name');
    const lastText = document.getElementById('last-card-text');
    const finJuego = document.getElementById('fin-juego');
    if (placeholder) placeholder.style.display = 'block';
    if (img) img.style.display = 'none';
    if (name) name.style.display = 'none';
    if (lastText) lastText.textContent = 'Ninguna';
    if (finJuego) finJuego.style.display = 'none';
    document.getElementById('reset-confirm-modal').classList.add('hidden');
    // ✅ Resetear contadores
    document.getElementById('cards-generated-count').textContent = '0';
    document.getElementById('cards-remaining-count').textContent = '54';
}

function detenerGeneradorAutomatico() {
    if (generadorAutoInterval) {
        clearInterval(generadorAutoInterval);
        generadorAutoInterval = null;
    }
    generadorAutoActivo = false;
}

function iniciarGeneradorAutomatico(delay) {
    detenerGeneradorAutomatico();
    generadorAutoActivo = true;
    generadorAutoInterval = setInterval(() => {
        const carta = obtenerSiguienteCarta();
        if (carta === null) {
            mostrarFinJuego();
            detenerGeneradorAutomatico();
            return;
        }
        mostrarCartaActual(carta);
        agregarMiniatura(carta);
        cartasGeneradas.push(carta);
    }, delay);
}

function inicializarGenerador() {
    if (generadorInicializado) return;
    generadorInicializado = true;
    reiniciarMazo();
    cartasGeneradas = [];
    ultimaCarta = null;

    const placeholder = document.getElementById('generator-placeholder');
    const img = document.getElementById('current-card-img');
    const name = document.getElementById('current-card-name');
    const lastText = document.getElementById('last-card-text');
    const finJuego = document.getElementById('fin-juego');
    if (placeholder) placeholder.style.display = 'block';
    if (img) img.style.display = 'none';
    if (name) name.style.display = 'none';
    if (lastText) lastText.textContent = 'Ninguna';
    if (finJuego) finJuego.style.display = 'none';

    // ✅ Resetear contadores de cartas generadas/restantes
    document.getElementById('cards-generated-count').textContent = '0';
    document.getElementById('cards-remaining-count').textContent = '54';

    document.querySelector('#card-generator-modal .close')?.addEventListener('click', () => {
        document.getElementById('card-generator-modal').classList.add('hidden');
        detenerGeneradorAutomatico();
    });

    document.getElementById('next-card-btn')?.addEventListener('click', () => {
        if (generadorAutoActivo) return;
        const carta = obtenerSiguienteCarta();
        if (carta === null) {
            mostrarFinJuego();
            return;
        }
        mostrarCartaActual(carta);
        agregarMiniatura(carta);
        cartasGeneradas.push(carta);

        // ✅ Actualizar contadores
        document.getElementById('cards-generated-count').textContent = cartasGeneradas.length;
        document.getElementById('cards-remaining-count').textContent = 54 - cartasGeneradas.length;
    });

    document.getElementById('copy-current-card')?.addEventListener('click', () => {
        if (ultimaCarta) {
            navigator.clipboard.writeText(ultimaCarta).then(() => {
                const btn = document.getElementById('copy-current-card');
                btn.textContent = '✅ ¡Copiado!';
                setTimeout(() => {
                    btn.textContent = '📋 Copiar nombre';
                }, 2000);
            });
        }
    });

    document.getElementById('reset-generator-btn')?.addEventListener('click', () => {
        document.getElementById('reset-confirm-modal').classList.remove('hidden');
    });

    document.getElementById('capture-screenshot-btn')?.addEventListener('click', () => {
        subirCapturaCartas();
    });

    // === AGREGAR CONTROL AUTOMÁTICO ===
    const autoContainer = document.getElementById('auto-generator-container');
    if (!autoContainer) {
        const container = document.createElement('div');
        container.id = 'auto-generator-container';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        container.style.width = '100%';
        container.style.marginTop = '15px';

        const label = document.createElement('span');
        label.textContent = 'Generador automático:';
        label.style.fontWeight = 'bold';
        label.style.fontSize = '0.95rem';

        const select = document.createElement('select');
        select.id = 'auto-speed-select';
        select.style.padding = '8px';
        select.style.borderRadius = '4px';
        select.style.border = '1px solid #ccc';
        select.style.width = '100%';

        const options = [
            { text: 'Lento (8s)', value: 8000 },
            { text: 'Normal (5s)', value: 5000 },
            { text: 'Veloz (2.5s)', value: 2500 }
        ];
        options.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt.value;
            el.textContent = opt.text;
            select.appendChild(el);
        });

        const controlBtn = document.createElement('button');
        controlBtn.id = 'auto-control-btn';
        controlBtn.textContent = '▶️ Iniciar';
        controlBtn.style.background = '#4CAF50';
        controlBtn.style.color = 'white';
        controlBtn.style.border = 'none';
        controlBtn.style.padding = '10px';
        controlBtn.style.borderRadius = '6px';
        controlBtn.style.cursor = 'pointer';
        controlBtn.style.fontWeight = 'bold';
        controlBtn.style.width = '100%';

        controlBtn.addEventListener('click', () => {
            if (generadorAutoActivo) {
                detenerGeneradorAutomatico();
                controlBtn.textContent = '▶️ Retomar';
                controlBtn.style.background = '#4CAF50';
            } else {
                const delay = parseInt(select.value);
                iniciarGeneradorAutomatico(delay);
                controlBtn.textContent = '⏸ Pausa';
                controlBtn.style.background = '#ff9800';
            }
        });

        container.appendChild(label);
        container.appendChild(select);
        container.appendChild(controlBtn);

        const captureBtn = document.getElementById('capture-screenshot-btn');
        captureBtn.parentNode.insertBefore(container, captureBtn);
    }
}

// === INICIALIZACIÓN ===
async function initLoteria() {
    try {
        selecciones = await fetchGistFile('selecciones.json');
        try {
            config = await fetchGistFile('config.json');
        } catch (err) {
            config = { tablaCerrada: false, cartasPorUsuario: 2 };
        }
        renderTable();
        const savedUser = localStorage.getItem('loteriaUser');
        if (savedUser) {
            try {
                const { nickname, isAdmin } = JSON.parse(savedUser);
                window.appState.currentUser = nickname;
                window.appState.isAdmin = isAdmin;
                const userLower = nickname.toLowerCase();
                const userCardCount = Object.values(selecciones).filter(owner =>
                    owner && owner.toLowerCase() === userLower
                ).length;
                const maxCartas = config.cartasPorUsuario || 2;
                window.appState.userHasConfirmed = userCardCount >= maxCartas;
                updateAuthUI();
                updateAdminPanel();
                startPolling();
            } catch (e) {
                console.error('Error al restaurar sesión:', e);
                localStorage.removeItem('loteriaUser');
            }
        }
    } catch (err) {
        console.error('Error al cargar selecciones:', err);
        document.querySelector('.desktop-table').textContent = '⚠️ Error de conexión';
        document.querySelector('.mobile-table').textContent = '⚠️ Error de conexión';
    }
}

document.addEventListener('DOMContentLoaded', initLoteria);

document.addEventListener('click', function (e) {
    if (e.target.id === 'cancel-reset') {
        document.getElementById('reset-confirm-modal').classList.add('hidden');
    }
    if (e.target.id === 'confirm-reset') {
        reiniciarGenerador();
    }
    if (e.target.classList.contains('reset-close')) {
        document.getElementById('reset-confirm-modal').classList.add('hidden');
    }
});

// === EXPOSICIÓN GLOBAL ===
window.loteria = {
    setUsuario: (user, admin) => {
        window.appState.currentUser = user;
        window.appState.isAdmin = admin;
        localStorage.setItem('loteriaUser', JSON.stringify({
            nickname: user,
            isAdmin: admin
        }));
        const userLower = user.toLowerCase();
        const userCardCount = Object.values(selecciones).filter(owner =>
            owner && owner.toLowerCase() === userLower
        ).length;
        const maxCartas = config.cartasPorUsuario || 2;
        window.appState.userHasConfirmed = userCardCount >= maxCartas;
        renderTable();
        updateAdminPanel();
        updateConfirmButton();
        startPolling();
    },
    clearAll: async () => {
        if (confirm('¿Vaciar todas las cartas?')) {
            if (window.appState.currentUser) {
                window.appState.userHasConfirmed = false;
                tempSelections.clear();
            }
            selecciones = {};
            await saveSelections();
            updateConfirmButton();
        }
    },
    confirmSelection: confirmSelection,
    clearTempSelections: () => {
        tempSelections.clear();
        window.appState.userHasConfirmed = false;
        renderTable();
        updateConfirmButton();
    },
    stopPolling: stopPolling
};

// === ACTUALIZAR PANEL DE ADMIN ===
function updateAdminPanel() {
    const panel = document.getElementById('admin-panel');
    if (window.appState.isAdmin) {
        panel.classList.remove('hidden');

        // Botón: Cerrar/Abrir tabla
        let toggleBtn = document.getElementById('toggle-table-btn');
        if (!toggleBtn) {
            toggleBtn = document.createElement('button');
            toggleBtn.id = 'toggle-table-btn';
            toggleBtn.textContent = config.tablaCerrada ? '🔓 Abrir tabla' : '🔒 Cerrar tabla';
            toggleBtn.onclick = async () => {
                config.tablaCerrada = !config.tablaCerrada;
                toggleBtn.textContent = config.tablaCerrada ? '🔓 Abrir tabla' : '🔒 Cerrar tabla';
                await saveConfig();
                renderTable();
            };
            panel.appendChild(toggleBtn);
        } else {
            toggleBtn.textContent = config.tablaCerrada ? '🔓 Abrir tabla' : '🔒 Cerrar tabla';
        }

        // Botón: Vaciar todas las cartas
        let clearBtn = document.getElementById('clear-all');
        if (!clearBtn) {
            clearBtn = document.createElement('button');
            clearBtn.id = 'clear-all';
            clearBtn.textContent = '🧹 Vaciar todas las cartas';
            clearBtn.onclick = async () => {
                if (confirm('¿Vaciar todas las cartas?')) {
                    if (window.appState.currentUser) {
                        window.appState.userHasConfirmed = false;
                        tempSelections.clear();
                    }
                    selecciones = {};
                    await saveSelections();
                    updateConfirmButton();
                }
            };
            panel.appendChild(clearBtn);
        }

        // Botón: Generar cartas
        let generatorBtn = document.getElementById('generator-btn');
        if (!generatorBtn) {
            generatorBtn = document.createElement('button');
            generatorBtn.id = 'generator-btn';
            generatorBtn.textContent = '🎲 Generar Cartas';
            generatorBtn.onclick = () => {
                document.getElementById('card-generator-modal').classList.remove('hidden');
                inicializarGenerador();
            };
            panel.appendChild(generatorBtn);
        }

        // ✅ Selector: Cartas por usuario (con validación)
        let cardsPerUserContainer = document.getElementById('cards-per-user-container');
        if (!cardsPerUserContainer) {
            cardsPerUserContainer = document.createElement('div');
            cardsPerUserContainer.id = 'cards-per-user-container';
            cardsPerUserContainer.style.display = 'flex';
            cardsPerUserContainer.style.gap = '8px';
            cardsPerUserContainer.style.alignItems = 'center';
            cardsPerUserContainer.style.marginTop = '10px';

            const label = document.createElement('span');
            label.textContent = 'Cartas por usuario:';
            label.style.fontWeight = 'bold';
            label.style.fontSize = '0.9rem';

            const select = document.createElement('select');
            select.id = 'cards-per-user-select';
            select.style.padding = '6px';
            select.style.borderRadius = '4px';
            select.style.border = '1px solid #ccc';

            [1, 2].forEach(num => {
                const opt = document.createElement('option');
                opt.value = num;
                opt.textContent = num;
                if ((config.cartasPorUsuario || 2) === num) opt.selected = true;
                select.appendChild(opt);
            });

            select.addEventListener('change', async () => {
                const newValue = parseInt(select.value);
                const currentValue = config.cartasPorUsuario || 2;

                // Si intenta reducir de 2 a 1
                if (newValue === 1 && currentValue === 2) {
                    // Verificar si algún usuario tiene 2 cartas
                    const userCardCounts = {};
                    for (const owner of Object.values(selecciones)) {
                        if (owner) {
                            userCardCounts[owner] = (userCardCounts[owner] || 0) + 1;
                        }
                    }
                    const hasUserWithTwoCards = Object.values(userCardCounts).some(count => count >= 2);

                    if (hasUserWithTwoCards) {
                        // Mostrar modal y revertir selección
                        select.value = 2;
                        document.getElementById('cards-reduction-modal').classList.remove('hidden');
                        return;
                    }
                }

                // Si pasa la validación, guardar
                config.cartasPorUsuario = newValue;
                await saveConfig();
                renderTable();
                if (window.appState.currentUser) {
                    const userLower = window.appState.currentUser.toLowerCase();
                    const count = Object.values(selecciones).filter(owner =>
                        owner && owner.toLowerCase() === userLower
                    ).length;
                    window.appState.userHasConfirmed = count >= newValue;
                    updateConfirmButton();
                }
            });

            cardsPerUserContainer.appendChild(label);
            cardsPerUserContainer.appendChild(select);
            panel.appendChild(cardsPerUserContainer);
        } else {
            const select = document.getElementById('cards-per-user-select');
            if (select) select.value = config.cartasPorUsuario || 2;
        }
    } else {
        panel.classList.add('hidden');
    }
}