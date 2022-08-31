let nomeLogin = document.getElementById('nomeLogin');
let senhaLogin = document.getElementById('senhaLogin');
let login = document.getElementById('login');
login.addEventListener('submit', (event) => {
    event.preventDefault();
    logar();
});

function logar(){
   let usuario = buscarUsuarios();
    let usuarioEncontrado = usuario.find((usuario) => usuario.senha === senhaLogin.value);
    if (!usuarioEncontrado) {
        alert("nome ou senha incorretas! Verifique e tente novamente!");
        login.reset();
        return;
    }
   
   localStorage.setItem('usuarioLogado', usuarioEncontrado.senha);
    window.location.href = 'recados.html';
}
function buscarUsuarios() {
   return JSON.parse(localStorage.getItem('usuario') || '[]');
}

