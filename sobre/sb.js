const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("voltar");

toggle.addEventListener("click", () => {
    menu.classList.toggle("show");
});



document.addEventListener('DOMContentLoaded', function () {
    window.mostrarCard = function(cardId) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.remove('active');
        });
        const cardAtivo = document.getElementById(cardId);
        if (cardAtivo) {
            cardAtivo.classList.add('active');
        }
    };
});