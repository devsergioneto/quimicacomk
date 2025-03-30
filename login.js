document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const inscreverBtn = document.getElementById('inscreverBtn');
    const mensagemDiv = document.getElementById('mensagem');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // Simulação de login (você precisaria de um backend real para isso)
        // No seu arquivo login.js, dentro do bloco 'if' de login bem-sucedido:
        if (email === 'usuario@email.com' && senha === 'senha123') {
            mensagemDiv.textContent = 'Login realizado com sucesso!';
            mensagemDiv.className = 'mensagem sucesso';
            window.location.href = 'abaaluno.html'; // Redireciona para a página do aluno
        }
         else {
            mensagemDiv.textContent = 'Email ou senha inválidos.';
            mensagemDiv.className = 'mensagem erro';
        }
    });

    inscreverBtn.addEventListener('click', function() {
        // Redireciona para a página de inscrição
        window.location.href = 'inscricao.html';
    });
});