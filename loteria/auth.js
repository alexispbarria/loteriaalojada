// auth.js
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que los elementos existen antes de añadir eventos
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.addEventListener('click', () => {
            document.getElementById('auth-modal').classList.remove('hidden');
        });
    }
    document.querySelectorAll('.close').forEach(el => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
        });
    });
    const goToLoginBtn = document.getElementById('go-to-login-btn');
    if (goToLoginBtn) {
        goToLoginBtn.addEventListener('click', () => {
            document.getElementById('login-required-modal').classList.add('hidden');
            document.getElementById('auth-modal').classList.remove('hidden');
        });
    }
    const closeLockedModal = document.getElementById('close-locked-modal');
    if (closeLockedModal) {
        closeLockedModal.addEventListener('click', () => {
            document.getElementById('cards-locked-modal').classList.add('hidden');
        });
    }
    const closeTableModal = document.getElementById('close-table-modal');
    if (closeTableModal) {
        closeTableModal.addEventListener('click', () => {
            document.getElementById('table-closed-modal').classList.add('hidden');
        });
    }
    const userNameBtn = document.getElementById('user-name-btn');
    if (userNameBtn) {
        userNameBtn.addEventListener('click', () => {
            const dropdown = document.getElementById('user-dropdown');
            dropdown.classList.toggle('hidden');
        });
    }
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.appState.currentUser = null;
            window.appState.isAdmin = false;
            updateAuthUI();
            window.loteria.clearTempSelections();
            document.getElementById('user-dropdown').classList.add('hidden');
            localStorage.removeItem('loteriaUser');
            window.loteria.stopPolling(); // Detener polling
        });
    }
    const changePasswordBtn = document.getElementById('change-password-btn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            document.getElementById('user-dropdown').classList.add('hidden');
            document.getElementById('password-modal').classList.remove('hidden');
        });
    }
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', handleLogin);
    }
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handleChangePassword);
    }
    const confirmBtn = document.getElementById('confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', window.loteria.confirmSelection);
    }
    const closeReductionModal = document.getElementById('close-reduction-modal');
    if (closeReductionModal) {
        closeReductionModal.addEventListener('click', () => {
            document.getElementById('cards-reduction-modal').classList.add('hidden');
        });
    }
});

async function handleLogin(e) {
    e.preventDefault();
    const nickInput = document.getElementById('nickname').value.trim();
    const nickLower = nickInput.toLowerCase();
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('auth-message');
    msg.textContent = 'Procesando...';

    try {
        const hash = await hashPassword(pass);
        const users = await fetchGistFile('usuarios.json');

        if (users[nickLower]) {
            if (users[nickLower] === hash) {
                const admins = await fetchGistFile('admins.json');
                // Normalizar admins a minúsculas
                const isAdmin = Array.isArray(admins) && admins.map(a => a.toLowerCase()).includes(nickLower);
                window.appState.currentUser = nickInput;
                window.appState.isAdmin = isAdmin;
                updateAuthUI();
                window.loteria.setUsuario(nickInput, isAdmin);
                document.getElementById('auth-modal').classList.add('hidden');
                localStorage.setItem('loteriaUser', JSON.stringify({
                    nickname: nickInput,
                    isAdmin: isAdmin
                }));
            } else {
                msg.textContent = 'Contraseña incorrecta.';
            }
        } else {
            users[nickLower] = hash;
            await updateGist({ 'usuarios.json': { content: JSON.stringify(users, null, 2) } });
            window.appState.currentUser = nickInput;
            window.appState.isAdmin = false;
            updateAuthUI();
            window.loteria.setUsuario(nickInput, false);
            document.getElementById('auth-modal').classList.add('hidden');
            localStorage.setItem('loteriaUser', JSON.stringify({
                nickname: nickInput,
                isAdmin: false
            }));
        }
    } catch (err) {
        msg.textContent = 'Error: ' + (err.message || 'conexión');
        console.error(err);
    }
}

async function handleChangePassword(e) {
    e.preventDefault();
    const currentPass = document.getElementById('current-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;
    const msg = document.getElementById('password-message');

    if (newPass !== confirmPass) {
        msg.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    try {
        const currentHash = await hashPassword(currentPass);
        const newHash = await hashPassword(newPass);
        const users = await fetchGistFile('usuarios.json');

        if (!window.appState.currentUser) {
            msg.textContent = 'Sesión inválida.';
            return;
        }

        const currentUserLower = window.appState.currentUser.toLowerCase();
        if (users[currentUserLower] !== currentHash) {
            msg.textContent = 'Contraseña actual incorrecta.';
            return;
        }

        users[currentUserLower] = newHash;
        await updateGist({ 'usuarios.json': { content: JSON.stringify(users, null, 2) } });
        msg.textContent = 'Contraseña actualizada correctamente.';
        setTimeout(() => {
            document.getElementById('password-modal').classList.add('hidden');
        }, 1500);
    } catch (err) {
        msg.textContent = 'Error al actualizar: ' + err.message;
        console.error(err);
    }
}

function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    const userMenu = document.getElementById('user-menu');
    const userNameBtn = document.getElementById('user-name-btn');
    const adminPanel = document.getElementById('admin-panel');

    if (window.appState.currentUser) {
        if (authBtn) authBtn.classList.add('hidden');
        if (userMenu) userMenu.classList.remove('hidden');
        if (userNameBtn) userNameBtn.textContent = window.appState.currentUser;
    } else {
        if (authBtn) authBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
        if (adminPanel) adminPanel.classList.add('hidden');
    }
}

// Funciones auxiliares
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

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

// Restaurar sesión al cargar
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('loteriaUser');
    if (savedUser) {
        try {
            const { nickname, isAdmin } = JSON.parse(savedUser);
            window.appState.currentUser = nickname;
            window.appState.isAdmin = isAdmin;
            updateAuthUI();
            // La inicialización de loteria.js se encargará del resto
        } catch (e) {
            console.error('Error al restaurar sesión:', e);
            localStorage.removeItem('loteriaUser');
        }
    }
});