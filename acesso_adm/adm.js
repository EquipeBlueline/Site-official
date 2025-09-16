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

    function renderAdminList() {
        const container = document.getElementById('postsAdminList');
        if (!container) return;
        const posts = readPosts().sort((a, b) => b.createdAt - a.createdAt);
        if (posts.length === 0) {
            container.innerHTML = '<p>Sem publicações ainda.</p>';
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
                    <button class="btn-secondary btn-small" data-action="edit">Editar</button>
                    <button class="btn-danger btn-small" data-action="delete">Excluir</button>
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
                } else {
                    alert('Usuário ou senha inválidos');
                }
            });
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', function () {
                setSession(false);
                handleLoginUI();
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
                alert('Publicado com sucesso');
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
                    if (confirm('Excluir esta publicação?')) {
                        posts.splice(idx, 1);
                        writePosts(posts);
                        renderAdminList();
                    }
                } else if (action === 'edit') {
                    const current = posts[idx];
                    const newTitle = prompt('Novo título:', current.title) || current.title;
                    const newContent = prompt('Novo conteúdo:', current.content) || current.content;
                    const newImage = prompt('Nova URL da imagem (opcional):', current.imageUrl || '') || current.imageUrl;
                    posts[idx] = { ...current, title: newTitle.trim(), content: newContent.trim(), imageUrl: (newImage || '').trim() };
                    writePosts(posts);
                    renderAdminList();
                }
            });
        }
    });
})();


