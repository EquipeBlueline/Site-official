// Função para configurar o menu dropdown
function setupMenuDropdown() {
    const menuButton = document.getElementById('menuButton');
    const menuDropdown = document.getElementById('menuDropdown');
    
    if (menuButton && menuDropdown) {
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            menuDropdown.classList.toggle('active');
        });

        // Fecha o menu quando clicar fora
        document.addEventListener('click', function(e) {
            if (!menuButton.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.remove('active');
            }
        });

        // Fecha o menu quando clicar em um item
        const menuItems = menuDropdown.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuDropdown.classList.remove('active');
            });
        });
    }
}

// Tabs simples
document.addEventListener('DOMContentLoaded', () => {
    // Configurar menu dropdown
    setupMenuDropdown();
    
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

