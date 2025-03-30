document.addEventListener('DOMContentLoaded', function() {
    const inscricaoForm = document.getElementById('inscricaoForm');
    const inscricaoFeedback = document.getElementById('inscricaoFeedback');
    const metodoPagamentoSelect = document.getElementById('metodoPagamento');
    const cartaoCreditoCampos = document.getElementById('cartaoCreditoCampos');

    metodoPagamentoSelect.addEventListener('change', function() {
        cartaoCreditoCampos.style.display = this.value === 'cartaoCredito' ? 'block' : 'none';
        // Atualizar o atributo required dos campos de cartão de crédito
        const cartaoInputs = cartaoCreditoCampos.querySelectorAll('input');
        cartaoInputs.forEach(input => {
            input.required = this.value === 'cartaoCredito';
            // Limpar mensagens de erro ao mudar o método
            const errorSpan = input.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = '';
            }
        });
    });

    inscricaoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let hasErrors = false;

        // Validação dos campos obrigatórios
        inscricaoForm.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                hasErrors = true;
                const errorSpan = input.nextElementSibling;
                if (errorSpan && errorSpan.classList.contains('error-message')) {
                    errorSpan.textContent = 'Este campo é obrigatório.';
                }
                input.classList.add('error'); // Adiciona uma classe para estilização de erro
            } else {
                input.classList.remove('error');
                const errorSpan = input.nextElementSibling;
                if (errorSpan && errorSpan.classList.contains('error-message')) {
                    errorSpan.textContent = '';
                }
            }
        });

        // Validação específica para email
        const emailInput = document.getElementById('emailInscricao');
        if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
            hasErrors = true;
            const errorSpan = emailInput.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = 'Por favor, insira um email válido.';
            }
            emailInput.classList.add('error');
        } else if (emailInput.value.trim()) {
            emailInput.classList.remove('error');
            const errorSpan = emailInput.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = '';
            }
        }

        // Validação específica para número de cartão (se aplicável)
        const numeroCartaoInput = document.getElementById('numeroCartao');
        if (metodoPagamentoSelect.value === 'cartaoCredito' && numeroCartaoInput.value.trim() && !isValidCreditCardNumber(numeroCartaoInput.value)) {
            hasErrors = true;
            const errorSpan = numeroCartaoInput.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = 'Por favor, insira um número de cartão válido.';
            }
            numeroCartaoInput.classList.add('error');
        } else if (metodoPagamentoSelect.value === 'cartaoCredito' && numeroCartaoInput.value.trim()) {
            numeroCartaoInput.classList.remove('error');
            const errorSpan = numeroCartaoInput.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = '';
            }
        }

        if (hasErrors) {
            inscricaoFeedback.textContent = "Por favor, preencha todos os campos obrigatórios corretamente.";
            inscricaoFeedback.className = 'feedback error';
            setTimeout(() => {
                inscricaoFeedback.textContent = '';
                inscricaoFeedback.className = 'feedback';
            }, 5000);
        } else {
            // Simulação de envio de dados de inscrição
            inscricaoFeedback.textContent = "Processando sua inscrição...";
            inscricaoFeedback.className = 'feedback';
            setTimeout(() => {
                inscricaoFeedback.textContent = "Inscrição realizada com sucesso! Em breve, você receberá mais informações por email.";
                inscricaoFeedback.className = 'feedback success';
                inscricaoForm.reset();
                cartaoCreditoCampos.style.display = 'none'; // Oculta os campos de cartão após o envio
                metodoPagamentoSelect.value = ''; // Reseta a seleção do método de pagamento
                // Remover atributos required dos campos de cartão
                const cartaoInputs = cartaoCreditoCampos.querySelectorAll('input');
                cartaoInputs.forEach(input => {
                    input.required = false;
                    input.classList.remove('error');
                    const errorSpan = input.nextElementSibling;
                    if (errorSpan && errorSpan.classList.contains('error-message')) {
                        errorSpan.textContent = '';
                    }
                });
            }, 3000);
        }
    });

    // Validação em tempo real para o formulário de inscrição
    inscricaoForm.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.nextElementSibling.textContent = '';
                input.classList.remove('error');
            } else {
                input.nextElementSibling.textContent = input.validationMessage;
                input.classList.add('error');
            }
        });
    });
});

// Funções de validação (adicionadas)
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCreditCardNumber(cardNumber) {
    // Remove espaços e hífens
    const cleanedCardNumber = cardNumber.replace(/\s/g, '').replace(/-/g, '');
    return /^\d{16}$/.test(cleanedCardNumber); // Validação básica de 16 dígitos
}