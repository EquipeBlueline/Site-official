
function mostrarSecao(secao) {
    // esconde todas
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('active'));
    // mostra só a clicada
    const ativa = document.getElementById(secao);
    if (ativa) ativa.classList.add('active');
}

