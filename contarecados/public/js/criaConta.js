let nomeHTML = document.getElementById('nome');
let emailHTML = document.getElementById('email');
let senhaHTML= document.getElementById('senha');
let usuarioHTML = document.getElementById('usuario');
usuario.addEventListener('submit', (event) => {
   event.preventDefault();
   let retorno = validarCampos();
    if (!retorno) {
        return;
    }
    cadastrarUsuario();
});

function validarCampos() {
   if(nome == ''){
      alert('Preencha o campo nome');
      usuario.nome.focus();
      return false;
   }else if(email == ''){
      alert('Preencha o campo email corretamente');
      usuario.email.focus();
      return false;
   }else if(senha == '' || senha.length <= 8){
      alert('Preencha o campo senha com 6 caracteres');
      usuario.senha.focus();
      return false;
   }
   return true;

}

 function cadastrarUsuario() {
   let listaUsuarios = buscarUsuarioStorage();
   let existe = listaUsuarios.some((usuario) => usuario.senha === senhaHTML.value);
   if(existe){
      alert("senha já existe!");
      return;
   }
   const random = Math.floor((1+Math.random())* new Date().getTime()).toString(16).substring(1);
 const id = random + random;
 const novoUsuario = {
   id: `${id}-${id}-${id}-${id}`,
   nome: nomeHTML.value,
   email:emailHTML.value,
   senha:senhaHTML.value,
   recados:[]
 };

 listaUsuarios.push(novoUsuario);
 salvarUsuarioStorage(listaUsuarios);
 alert("conta criada com sucesso!");
 usuario.reset();
   window.location.href = 'index.html';
 }

 function salvarUsuarioStorage(listaDados){
      localStorage.setItem('usuario', JSON.stringify(listaDados));
 }

 function buscarUsuarioStorage(){
   return JSON.parse(localStorage.getItem('usuario') || "[]");
 }