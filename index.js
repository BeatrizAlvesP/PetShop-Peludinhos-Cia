//Adicionando conteúdo do script

const elementosDuvida = document.querySelectorAll('.duvida')

elementosDuvida.forEach(function (duvida) {
  duvida.addEventListener('click', function () {
    duvida.classList.toggle('ativa')
  })
})