// Funcionalidades extras para o menu (complementa o script principal)
function setupMenuExtras() {
    const menuDropdown = document.getElementById('menuDropdown');
    
    if (menuDropdown) {
        // Fecha o menu quando pressionar a tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuDropdown.classList.contains('active')) {
                menuDropdown.classList.remove('active');
            }
        });
    }
}

// Tabs simples
document.addEventListener('DOMContentLoaded', () => {
    // Configurar funcionalidades extras do menu
    setupMenuExtras();
    
    // Configurar tabs
    const buttons = Array.from(document.querySelectorAll('.tab-button'));
    const sections = Array.from(document.querySelectorAll('.card'));

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                if (sec.id === target) {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });
        });
    });
});

