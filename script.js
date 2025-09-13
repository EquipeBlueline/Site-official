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

// Inicializa o menu quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', setupMenuDropdown);
