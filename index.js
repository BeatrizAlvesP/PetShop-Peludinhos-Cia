// Verifica se o usuário está logado
function verificarLogin() {
  var usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario) {
    // Se o usuário estiver logado, exibe o botão de logout e esconde o de login
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'inline-block';
  } else {
    // Se não estiver logado, exibe o botão de login e esconde o de logout
    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('logoutBtn').style.display = 'none';
  }
}

// Alterna entre login e logout
function realizarLogin() {
  // Simula o login e salva o usuário no localStorage
  const username = 'teste'; // Nome de usuário simulado
  const password = '1234'; // Senha simulada

  // Verifica se o login é bem-sucedido
  if (username === 'teste' && password === '1234') {
    alert("Login bem-sucedido!");

    // Criação do objeto usuário simulado
    const usuario = { nome: 'Teste', username: 'teste' };

    // Salva as informações no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Redireciona de volta para a página principal (index.html)
    window.location.href = './Login/login.html';
  } else {
    alert('Usuário ou senha incorretos.');
  }
}

// Realiza o logout
function realizarLogout() {
  // Remove o usuário do localStorage e atualiza a página
  localStorage.removeItem('usuario');
  alert('Logout realizado com sucesso!');
  window.location.href = './index.html';
}

function redirecionarLojaPet() {
  // Verifique o login do usuário recuperando as informações do localStorage
  var usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario) {
    window.location.href = './loja-pet/loja.html'; // Caminho para a página loja.html
  } else {
    alert('Você precisa estar logado para acessar a loja pet.');
  }
}

// Função para redirecionar para a página de agendamento
function redirecionarConsulta() {
  var usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario) {
    window.location.href = './Consulta/agendamento.html'; // Redireciona se o usuário estiver logado
  } else {
    alert('Você precisa estar logado para marcar uma consulta.');
  }
}

// Função para redirecionar para a página de check-in
function redirecionarServico() {
  var usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario) {
    window.location.href = './Entrada/checkinpet.html'; // Redireciona se o usuário estiver logado
  } else {
    alert('Você precisa estar logado para acessar este serviço.');
  }
}

// Função para abrir o pop-up de login
function abrirPopUpLogin() {
  var usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario) {
    alert("Você precisa estar logado para acessar essa funcionalidade. Faça login para continuar.");
  }
}

// Alterna a classe 'ativa' ao clicar em um elemento com a classe 'duvida'
const elementosDuvida = document.querySelectorAll('.duvida');

elementosDuvida.forEach(function(duvida) {
  duvida.addEventListener('click', function() {
    duvida.classList.toggle('ativa');
  });
});

// Chama a função para verificar o status de login na carga da página
window.onload = verificarLogin;
