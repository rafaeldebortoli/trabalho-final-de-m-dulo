let descricao = document.getElementById('descricao');
let detalhar = document.getElementById('detalhar');
let tabela = document.getElementById('tabela');
let formulario = document.getElementById('formulario');
let dadosUsuarioLogado;
document.addEventListener('DOMContentLoaded', () => {
    let usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar essa página!");
        window.location.href = 'index.html';
    } else{
        alert(`seja bem vindo ${usuarioLogado}`)
    }
    let listaUsuarios = buscarTodosUsuarios();
    dadosUsuarioLogado = listaUsuarios.find((usuario) => usuario.senha === usuarioLogado);
    dadosUsuarioLogado.usuario.forEach((usuario) => montarHTML(usuario));
});

function buscarTodosUsuarios() {
    return JSON.parse(localStorage.getItem('usuario') || '[]');
}
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrarTarefas();
    editarTarefa();
    apagarTarefa();
});
function cadastrarTarefas(){
    const novaTarefa = {
        id:'',
        descricao:descricao.value,
        detalhar:detalhar.value,
    };
    dadosUsuarioLogado.usuario.push(novaTarefa);
    atualizarDadosUsuarioLogado(dadosUsuarioLogado);
    montarHTML(novaTarefa);
    formulario.reset();
}

function atualizarDadosUsuarioLogado(dadoAtualizado){
    let listaUsuarios = buscarTodosUsuarios();
    let indiceUsuarioEncontrado = listaUsuarios.findIndex((usuario) => usuario.senha === dadoAtualizado.senha);
    listaUsuarios[indiceUsuarioEncontrado] = dadoAtualizado;
    atualizarStorage(listaUsuarios);
}

function atualizarStorage(listaDados){
    localStorage.setItem('usuario', JSON.stringify(listaDados));
}

function montarHTML(novaTarefa){
    let linha = document.createElement('tr');
    linha.classList.add('tabela');
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
    botaoEditar.addEventListener('click',() => editarTarefa(novaTarefa));
    let botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.addEventListener('click',() => apagarTarefa(novaTarefa));
    colunaAcao.appendChild(botaoEditar);
    colunaAcao.appendChild(botaoApagar);
    linha.appendChild(id);
    linha.appendChild(descricao);
    linha.appendChild(detalhar);
    linha.appendChild(acao);
    tabela.appendChild(linha);
}

function editarTarefa(id){
    let indiceTarefaEncontrada = dadosUsuarioLogado.usuario.findIndex((novaTarefa) => novaTarefa.id === novaTarefa);
    let linha = document.getElementById(id);
    let confirma = confirm(`Voce deseja editar essa tarefa ${id}?`);
    if(confirma){
        linha.nextSibling();
        dadosUsuarioLogado.usuario.push(indiceTarefaEncontrada,1);
        atualizarDadosUsuarioLogado(dadosUsuarioLogado);
        
}

function apagarTarefa(id){
    let indiceTarefaEncontrada = dadosUsuarioLogado.usuario.findIndex((novaTarefa) => novaTarefa.id === novaTarefa);
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
}
function buscarStorage() { 
    return JSON.parse(localStorage.getItem('usuarioLogado') || '[]');
}