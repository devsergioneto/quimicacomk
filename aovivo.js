document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const interactionButtons = document.querySelectorAll('.interaction-button');
    const interactionContent = document.getElementById('interaction-content');

    // Função para adicionar uma mensagem ao chat
    function addChatMessage(sender, message, isSent = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isSent ? 'sent' : 'received');

        const senderSpan = document.createElement('span');
        senderSpan.classList.add('sender');
        senderSpan.textContent = sender + ':';

        const messageText = document.createTextNode(message);

        messageDiv.appendChild(senderSpan);
        messageDiv.appendChild(messageText);
        chatMessages.appendChild(messageDiv);

        // Rolar para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Evento para enviar mensagem ao clicar no botão
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            // Aqui você enviaria a mensagem para o servidor (simulação)
            const username = 'Você'; // Obter o nome do usuário logado
            addChatMessage(username, message, true);
            messageInput.value = '';
        }
    });

    // Evento para enviar mensagem ao pressionar Enter no input
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    // Eventos para as opções de interação (simulação)
    interactionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;
            interactionContent.innerHTML = `<p>Conteúdo da seção de ${buttonText} será carregado aqui.</p>`;
            // Aqui você carregaria o conteúdo dinamicamente (perguntas, enquetes, etc.)
        });
    });

    // Simulação de recebimento de mensagem do servidor (para teste)
    setTimeout(() => {
        addChatMessage('Professor', 'Lembrem-se de participar no chat com suas dúvidas!');
    }, 3000);
});