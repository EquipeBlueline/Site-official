// Simple client-side admin with localStorage persistence
// Nota: para produção real, use backend e autenticação segura.

(function () {
    const STORAGE_KEYS = {
        posts: 'blueline_posts',
        session: 'blueline_admin_session'
    };

    const ADMIN_CONFIG = {
        username: 'admin',
        // Altere esta senha para seus testes locais
        password: 'blueline2025'
    };

    function readPosts() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.posts);
            const list = raw ? JSON.parse(raw) : [];
            return Array.isArray(list) ? list : [];
        } catch (_) { return []; }
    }

    function writePosts(posts) {
        localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts));
        window.dispatchEvent(new CustomEvent('blueline:posts:updated'));
    }

    function createPostId() {
        return 'p_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    function formatDate(date) {
        return new Date(date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    }

    function setSession(active) {
        localStorage.setItem(STORAGE_KEYS.session, active ? '1' : '0');
    }
    function isLogged() {
        return localStorage.getItem(STORAGE_KEYS.session) === '1';
    }

    function show(el) { el && (el.style.display = 'block'); }
    function hide(el) { el && (el.style.display = 'none'); }

    // Toast helpers
    function getAlertsRoot() {
        return document.getElementById('admAlerts');
    }
    function showToast(type, title, message, options) {
        const root = getAlertsRoot();
        if (!root) return;
        const duration = (options && options.duration) || 3000;
        const el = document.createElement('div');
        el.className = 'adm-toast ' + (type || 'info');
        el.innerHTML = `
            <button class="close" aria-label="Fechar">✕</button>
            <p class="title">${escapeHtml(title || '')}</p>
            <p class="message">${escapeHtml(message || '')}</p>
            <div class="bar" style="animation-duration:${duration}ms"></div>
        `;
        root.appendChild(el);
        const close = () => {
            if (!el.parentNode) return;
            el.parentNode.removeChild(el);
        };
        el.querySelector('.close').addEventListener('click', close);
        setTimeout(close, duration + 150);
    }

    // Confirm modal helper
    function confirmModal(title, message) {
        return new Promise(resolve => {
            const backdrop = document.createElement('div');
            backdrop.className = 'adm-confirm-backdrop';
            backdrop.innerHTML = `
                <div class="adm-confirm">
                    <h4>${escapeHtml(title || 'Confirmar')}</h4>
                    <p>${escapeHtml(message || '')}</p>
                    <div class="actions">
                        <button class="btn-secondary">Cancelar</button>
                        <button class="btn-danger">Confirmar</button>
                    </div>
                </div>
            `;
            document.body.appendChild(backdrop);
            const cleanup = () => backdrop.parentNode && backdrop.parentNode.removeChild(backdrop);
            const [btnCancel, btnOk] = backdrop.querySelectorAll('button');
            btnCancel.addEventListener('click', () => { cleanup(); resolve(false); });
            btnOk.addEventListener('click', () => { cleanup(); resolve(true); });
            backdrop.addEventListener('click', (e) => { if (e.target === backdrop) { cleanup(); resolve(false); } });
        });
    }

    function renderAdminList() {
        const container = document.getElementById('postsAdminList');
        if (!container) return;
        const posts = readPosts().sort((a, b) => b.createdAt - a.createdAt);
        if (posts.length === 0) {
            container.innerHTML = '<div class="posts-admin-empty">\n  <p>Nenhuma publicação ainda.</p>\n  <p class="empty-hint">Crie um novo post ao lado para começar.</p>\n</div>';
            return;
        }
        container.innerHTML = posts.map(post => {
            const thumb = post.imageUrl ? `<img class="admin-post-thumb" src="${post.imageUrl}" alt="thumb">` : '';
            return `
                <div class="admin-post-item" data-id="${post.id}">
                    ${thumb}
                    <div class="admin-post-meta">
                        <p class="admin-post-title"><strong>${escapeHtml(post.title)}</strong></p>
                        <p class="admin-post-date">${formatDate(post.createdAt)}</p>
                    </div>
                    <div class="admin-post-actions">
                        <button class="btn-secondary btn-small" data-action="edit">Editar</button>
                        <button class="btn-danger btn-small" data-action="delete">Excluir</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function handleLoginUI() {
        const loginSection = document.getElementById('loginSection');
        const panelSection = document.getElementById('panelSection');
        if (isLogged()) {
            hide(loginSection);
            show(panelSection);
            renderAdminList();
            return;
        }
        show(loginSection);
        hide(panelSection);
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Login flow
        const loginForm = document.getElementById('loginForm');
        const postForm = document.getElementById('postForm');
        const logoutButton = document.getElementById('logoutButton');
        const adminList = document.getElementById('postsAdminList');

        handleLoginUI();

        if (loginForm) {
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const u = document.getElementById('username').value.trim();
                const p = document.getElementById('password').value;
                if (u === ADMIN_CONFIG.username && p === ADMIN_CONFIG.password) {
                    setSession(true);
                    handleLoginUI();
                    showToast('success', 'Login realizado', 'Bem-vindo ao painel.');
                } else {
                    showToast('error', 'Falha no login', 'Usuário ou senha inválidos.');
                }
            });
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', async function () {
                const ok = await confirmModal('Sair do painel', 'Tem certeza que deseja sair?');
                if (!ok) return;
                setSession(false);
                handleLoginUI();
                showToast('info', 'Sessão encerrada', 'Você saiu do painel.');
            });
        }

        if (postForm) {
            postForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const title = document.getElementById('postTitle').value.trim();
                const content = document.getElementById('postContent').value.trim();
                const imageUrl = document.getElementById('postImageUrl').value.trim();
                if (!title || !content) return;

                const posts = readPosts();
                posts.push({
                    id: createPostId(),
                    title,
                    content,
                    imageUrl: imageUrl || '',
                    createdAt: Date.now()
                });
                writePosts(posts);
                postForm.reset();
                renderAdminList();
                showToast('success', 'Publicado', 'Seu post foi publicado com sucesso.');
            });
        }

        if (adminList) {
            adminList.addEventListener('click', function (e) {
                const target = e.target;
                if (!(target instanceof Element)) return;
                const item = target.closest('.admin-post-item');
                if (!item) return;
                const id = item.getAttribute('data-id');
                const action = target.getAttribute('data-action');
                if (!id || !action) return;
                const posts = readPosts();
                const idx = posts.findIndex(p => p.id === id);
                if (idx === -1) return;
                if (action === 'delete') {
                    confirmModal('Excluir publicação', 'Tem certeza que deseja excluir este item?').then(ok => {
                        if (!ok) return;
                        posts.splice(idx, 1);
                        writePosts(posts);
                        renderAdminList();
                        showToast('success', 'Excluído', 'A publicação foi removida.');
                    });
                } else if (action === 'edit') {
                    const current = posts[idx];
                    const newTitle = prompt('Novo título:', current.title) || current.title;
                    const newContent = prompt('Novo conteúdo:', current.content) || current.content;
                    const newImage = prompt('Nova URL da imagem (opcional):', current.imageUrl || '') || current.imageUrl;
                    posts[idx] = { ...current, title: newTitle.trim(), content: newContent.trim(), imageUrl: (newImage || '').trim() };
                    writePosts(posts);
                    renderAdminList();
                    showToast('info', 'Post atualizado', 'As alterações foram salvas.');
                }
            });
        }
    });
})();


