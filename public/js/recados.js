let descricao = document.getElementById('descricao');
let detalhar = document.getElementById('detalhar');
let tabela = document.getElementById('tabela');
let formulario = document.getElementById('formulario');
let dadosUsuarioLogado;

document.addEventListener('DOMContentLoaded', () => {
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar essa página!");
        window.location.href = 'index.html';
    } else{
        alert(`seja bem vindo ${usuarioLogado.nome}`)
    }
    let listaUsuarios = buscarTodosUsuarios();
    dadosUsuarioLogado = listaUsuarios.find((usuario) => usuario.id === usuarioLogado.id);
    dadosUsuarioLogado.recados.forEach((usuario) => montarHTML(usuario));
});

function buscarTodosUsuarios() {
    return JSON.parse(localStorage.getItem('usuario') || '[]');
}
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrarTarefas();
   
});
function cadastrarTarefas(){
    const random = Math.floor((1+Math.random())* new Date().getTime()).toString(16).substring(1);
    const id = random + random;
    const novaTarefa = {
        id,
        descricao:descricao.value,
        detalhar:detalhar.value,
    };

    dadosUsuarioLogado.recados.push(novaTarefa); 
    montarHTML(novaTarefa); 
    atualizarDadosUsuarioLogado(dadosUsuarioLogado);
     
     formulario.reset();
}

function atualizarDadosUsuarioLogado(dadoAtualizado){
    let listaUsuarios = buscarTodosUsuarios();
    let indiceUsuarioEncontrado = listaUsuarios.findIndex((usuario) => usuario.id === dadoAtualizado.id);
    listaUsuarios[indiceUsuarioEncontrado] = dadoAtualizado;
    atualizarStorage(listaUsuarios);
}

function atualizarStorage(listaDados){
    localStorage.setItem('usuario', JSON.stringify(listaDados));
}

function montarHTML(novaTarefa){

    console.log('newmmmmmmmmAS');
    let linha = document.createElement('tr');
  
    linha.setAttribute('id',novaTarefa.id);
    let colunaId = document.createElement('td');
    colunaId.innerHTML = `${novaTarefa.id}`;
    let colunaDescricao = document.createElement('td');
    colunaDescricao.innerHTML = novaTarefa.descricao;
    let colunaDetalhar = document.createElement('td');
    colunaDetalhar.innerHTML = novaTarefa.detalhar;
    let colunaAcao = document.createElement('td');
    let botaoEditar = document.createElement('button');
    botaoEditar.innerHTML = 'Editar';
    botaoEditar.addEventListener('click',() => editarTarefa(novaTarefa.id));
    let botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.addEventListener('click',() => apagarTarefa(novaTarefa.id));
    colunaAcao.appendChild(botaoEditar);
    colunaAcao.appendChild(botaoApagar);
    linha.appendChild(colunaId);
    linha.appendChild(colunaDescricao);
    linha.appendChild(colunaDetalhar);
    linha.appendChild(colunaAcao);
    tabela.appendChild(linha);
}


function editarTarefa(id){
    let TarefaEncontrada = dadosUsuarioLogado.recados.findIndex((recado) => recado.id === id);
    
let btn=document.getElementById('btn')
    let confirma = confirm(`Voce deseja editar essa tarefa ${id}?`);
    if(confirma){
         descricao.value=dadosUsuarioLogado.recados[TarefaEncontrada].descricao
        detalhar.value= dadosUsuarioLogado.recados[TarefaEncontrada].detalhar

        btn.value="Atualizar"
btn.onclick=()=>{
    modificaRecados(TarefaEncontrada,btn)
}
   
        
}}

function modificaRecados(TarefaEncontrada,btn){
    dadosUsuarioLogado.recados[TarefaEncontrada]= descricao.value,
    dadosUsuarioLogado.recados[TarefaEncontrada]= detalhar.value

      atualizarDadosUsuarioLogado(dadosUsuarioLogado);

      btn.value="salvar"
      btn.removeAttribute('onclick')
      
}

function apagarTarefa(id){
    let indiceTarefaEncontrada = dadosUsuarioLogado.recados.findIndex((novaTarefa) => novaTarefa.id === id);
    let linha = document.getElementById(id);
    let confirma = confirm(`Voce deseja excluir essa tarefa ${id}?`);
    if(confirma){
       linha.remove();
         dadosUsuarioLogado.usuario.splice(indiceTarefaEncontrada,1); 
    atualizarDadosUsuarioLogado(dadosUsuarioLogado); 
       
    }
    else{
        alert('operacão cancelada');
    }
}

function buscarStorage() { 
    return JSON.parse(localStorage.getItem('cadastrarTarefas') || '[]');
}