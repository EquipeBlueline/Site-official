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

// Função para mostrar modal de doação
function showDonationModal() {
    const modal = document.getElementById('donationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para mostrar modal de colaboração
function showCollaborationModal() {
    const modal = document.getElementById('collaborationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para mostrar modal de parceria
function showPartnershipModal() {
    const modal = document.getElementById('partnershipModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para fechar modais
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Função para copiar texto para a área de transferência
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Mostrar feedback visual
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copiado!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#28a745';
        }, 2000);
    }).catch(function(err) {
        console.error('Erro ao copiar: ', err);
        alert('Erro ao copiar. Tente novamente.');
    });
}

// Função para validar e enviar formulário de contato
function handleContactForm(event) {
    // Permitir que o FormSubmit processe o formulário naturalmente
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!data.name || !data.email || !data.subject || !data.message) {
        event.preventDefault();
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Feedback visual durante o envio
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Mostrar notificação de sucesso
    showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    
    // Resetar botão após um tempo (caso não seja redirecionado)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
}

// Função para validar e enviar formulário de colaboração
function handleCollaborationForm(event) {
    // Permitir que o FormSubmit processe o formulário naturalmente
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!data.collabName || !data.collabEmail || !data.collabArea) {
        event.preventDefault();
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Feedback visual durante o envio
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Mostrar notificação de sucesso
    showNotification('Proposta de colaboração enviada com sucesso! Analisaremos sua proposta e entraremos em contato.', 'success');
    
    // Fechar modal após envio
    setTimeout(() => {
        closeModal('collaborationModal');
    }, 1500);
    
    // Resetar botão após um tempo (caso não seja redirecionado)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
}

// Função para validar e enviar formulário de parceria
function handlePartnershipForm(event) {
    // Permitir que o FormSubmit processe o formulário naturalmente
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!data.partnerName || !data.partnerContact || !data.partnerEmail || !data.partnerType) {
        event.preventDefault();
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Feedback visual durante o envio
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Mostrar notificação de sucesso
    showNotification('Proposta de parceria enviada com sucesso! Nossa equipe analisará sua proposta e retornará em breve.', 'success');
    
    // Fechar modal após envio
    setTimeout(() => {
        closeModal('partnershipModal');
    }, 1500);
    
    // Resetar botão após um tempo (caso não seja redirecionado)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
}

// Função para fechar modais ao clicar fora
function closeModalOnOutsideClick(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Função para animar elementos quando entram na tela
function animateOnScroll() {
    const elements = document.querySelectorAll('.contact-card, .support-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Função para adicionar efeitos de hover nos cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.contact-card, .support-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Função para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para adicionar validação em tempo real
function addRealTimeValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 10px rgba(220, 53, 69, 0.3)';
            } else {
                this.style.borderColor = '#4da6ff';
                this.style.boxShadow = '0 0 10px rgba(77, 166, 255, 0.3)';
            }
        });
    });
}

// Função para mostrar notificação de sucesso
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar menu dropdown
    setupMenuDropdown();
    
    // Configurar formulários
    const contactForm = document.getElementById('contactForm');
    const collaborationForm = document.getElementById('collaborationForm');
    const partnershipForm = document.getElementById('partnershipForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (collaborationForm) {
        collaborationForm.addEventListener('submit', handleCollaborationForm);
    }
    
    if (partnershipForm) {
        partnershipForm.addEventListener('submit', handlePartnershipForm);
    }
    
    // Configurar fechamento de modais
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', closeModalOnOutsideClick);
    });
    
    // Configurar animações
    animateOnScroll();
    addHoverEffects();
    addRealTimeValidation();
    
    // Adicionar estilos de animação para notificações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Função para scroll suave para seções
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para destacar campos obrigatórios
function highlightRequiredFields() {
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('invalid', function() {
            this.style.borderColor = '#dc3545';
            this.style.boxShadow = '0 0 10px rgba(220, 53, 69, 0.3)';
        });
        
        field.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#28a745';
                this.style.boxShadow = '0 0 10px rgba(40, 167, 69, 0.3)';
            }
        });
    });
}

// Chamar função de destaque de campos obrigatórios
document.addEventListener('DOMContentLoaded', highlightRequiredFields);
