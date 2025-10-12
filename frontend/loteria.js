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

// Estado global
window.appState = {
    currentUser: null,
    isAdmin: false,
    userHasConfirmed: false
};

let selecciones = {};
let tempSelections = new Set();

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
    return Object.values(selecciones).filter(owner => owner === window.appState.currentUser).length;
}

function getMaxSelectableCards() {
    const saved = getSavedCardsCount();
    return Math.max(0, 2 - saved);
}

// === RENDER ===
function renderTable() {
    // Renderizar versión desktop
    const desktop = document.querySelector('.desktop-table');
    if (desktop) {
        desktop.innerHTML = '';
        const desktopTable = createDesktopTable();
        desktop.appendChild(desktopTable);
    }

    // Renderizar versión móvil
    const mobile = document.querySelector('.mobile-table');
    if (mobile) {
        mobile.innerHTML = '';
        const mobileTable = createMobileTable();
        mobile.appendChild(mobileTable);
    }

    // Añadir eventos a ambas versiones
    document.querySelectorAll('.player-cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    if (window.appState.isAdmin) {
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', handleRemove);
        });
    }

    updateConfirmButton();
}

// === TABLA DE ESCRITORIO (4 columnas verticales) ===
function createDesktopTable() {
    const table = document.createElement('table');
    table.className = 'desktop-cards-table';
    
    // Crear thead con 8 columnas (4 pares)
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

    // Crear filas (14 filas)
    const tbody = document.createElement('tbody');
    const numFilas = 14;
    const numColumnas = 4;

    for (let fila = 0; fila < numFilas; fila++) {
        const tr = document.createElement('tr');
        
        for (let col = 0; col < numColumnas; col++) {
            const index = fila + col * numFilas; // Índice para columna vertical
            
            if (index < CARTAS.length) {
                const carta = CARTAS[index];
                
                // Celda de carta
                const cartaCell = document.createElement('td');
                cartaCell.className = 'number-cell pink-bg';
                cartaCell.textContent = carta;
                cartaCell.dataset.card = carta;
                tr.appendChild(cartaCell);
                
                // Celda de jugador
                const jugadorCell = document.createElement('td');
                jugadorCell.className = 'player-cell';
                jugadorCell.dataset.card = carta;
                
                let jugador = selecciones[carta] || '—';
                if ((window.appState.userHasConfirmed && selecciones[carta] === window.appState.currentUser) ||
                    tempSelections.has(carta)) {
                    jugador = window.appState.currentUser;
                }
                jugadorCell.textContent = jugador;
                
                // Botón de eliminar para admin
                if (window.appState.isAdmin && jugador !== '—') {
                    jugadorCell.innerHTML = `${jugador} <span class="remove-btn" data-card="${carta}">×</span>`;
                }
                
                tr.appendChild(jugadorCell);
            } else {
                // Celdas vacías
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

// === TABLA MÓVIL (vertical) ===
function createMobileTable() {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead><tr><th>Carta</th><th>Jugador</th></tr></thead>
        <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');

    CARTAS.forEach(carta => {
        let jugador = selecciones[carta] || '—';
        
        if ((window.appState.userHasConfirmed && selecciones[carta] === window.appState.currentUser) ||
            tempSelections.has(carta)) {
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

    // Si la carta TIENE un dueño, mostrar info (incluso si soy yo)
    if (currentOwner) {
        showUserCardsModal(currentOwner);
        return;
    }

    // Si la carta está vacía, aplicar lógica normal
    if (!window.appState.currentUser) {
        document.getElementById('login-required-modal').classList.remove('hidden');
        return;
    }

    if (window.appState.userHasConfirmed) {
        document.getElementById('cards-locked-modal').classList.remove('hidden');
        return;
    }

    // Verificar límite de selección
    const maxSelectable = getMaxSelectableCards();
    if (tempSelections.has(carta)) {
        tempSelections.delete(carta);
    } else {
        if (tempSelections.size >= maxSelectable) {
            alert(`Ya tienes ${2 - maxSelectable} carta(s) seleccionada(s). Solo puedes seleccionar ${maxSelectable} más.`);
            return;
        }
        tempSelections.add(carta);
    }

    renderTable();
    updateConfirmButton();
}

function showUserCardsModal(owner) {
    // Obtener todas las cartas del usuario
    const userCards = Object.entries(selecciones)
        .filter(([carta, user]) => user === owner)
        .map(([carta]) => carta);
    
    const message = userCards.length > 0 
        ? `El usuario <strong>${owner}</strong> ha seleccionado: <strong>${userCards.join(' y ')}</strong>`
        : `El usuario <strong>${owner}</strong> no tiene cartas seleccionadas.`;

    // Actualizar contenido del modal existente
    document.getElementById('user-cards-message').innerHTML = message;
    
    // Evento de copiar
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

    // Mostrar modal
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
            if (owner === window.appState.currentUser) {
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
    const savedCount = getSavedCardsCount();
    const totalNeeded = 2 - savedCount;
    
    if (tempSelections.size !== totalNeeded) {
        alert(`Debes seleccionar exactamente ${totalNeeded} carta(s) adicional(es).`);
        return;
    }

    for (const carta of tempSelections) {
        if (selecciones[carta] && selecciones[carta] !== window.appState.currentUser) {
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

// === INICIALIZACIÓN ===
async function initLoteria() {
    try {
        selecciones = await fetchGistFile('selecciones.json');
        renderTable();
    } catch (err) {
        console.error('Error al cargar selecciones:', err);
        document.querySelector('.desktop-table').textContent = '⚠️ Error de conexión';
        document.querySelector('.mobile-table').textContent = '⚠️ Error de conexión';
    }
}

document.addEventListener('DOMContentLoaded', initLoteria);

// Exponer para auth.js
window.loteria = {
    setUsuario: (user, admin) => {
        window.appState.currentUser = user;
        window.appState.isAdmin = admin;
        const userCardCount = Object.values(selecciones).filter(owner => owner === user).length;
        window.appState.userHasConfirmed = userCardCount >= 2;
        renderTable();
        document.getElementById('admin-panel').classList.toggle('hidden', !admin);
        updateConfirmButton();
    },
    clearAll: async () => {
        if (confirm('¿Vaciar todas las cartas?')) {
            selecciones = {};
            await saveSelections();
        }
    },
    confirmSelection: confirmSelection,
    clearTempSelections: () => {
        tempSelections.clear();
        window.appState.userHasConfirmed = false;
        renderTable();
        updateConfirmButton();
    }
};