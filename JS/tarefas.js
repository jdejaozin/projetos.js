// Array para receber as tarefas criadas
let banco = [];

// Função para adicionar tarefa
function criarItem (tarefa, status, indice){
    const item = document.createElement('label'); // Criação da label para receber os elementos necessários
                                                  // para a criação da tarefa
    item.classList.add('tarefas-item'); // Adição de uma class para identificação do item
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `; // Criação do elemento com o status (marcado ou desmarcado), índice e tarefa
    document.getElementById('tarefas-lista').appendChild(item); // Adição do elemento a respectiva div declarada
                                                                // no HTML
}

// Função para limpar as tarefas, função que será utilizada no momento de atualizar a tela para que não ocorra
// conflitos na criação ou exclusão de novas tarefas
function limparTarefas(){
    tarefas = document.getElementById('tarefas-lista'); // Definição da variável 'tarefas'
    while (tarefas.firstChild){ // Exclusão do elemento filho criado na div
        tarefas.removeChild(tarefas.lastChild);
    }
}

// Função para atualizar a tela com as alterações realizadas
function atualizarTela(){
    limparTarefas()
    // forEach para percorrer toda ao array obtendo as informações de cada tarefa criada e utilizando a função
    // de criar itens para atualizar os itens de acordo com os itens do array
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

// Função para adicionar uma nova tarefa
function inserirItem(evento){
    if (evento.key === 'Enter'){ // Utilização de um Event Listener para captar eventos do teclado
        banco.push ({'tarefa': evento.target.value, 'status': ''}); // Adição da tarefa criada ao array
        atualizarTela(); // Chamada da função para atualizar a tela
        evento.target.value = ''; // Reset do espaço onde o usuário escreve o nome da tarefa
    }
}

// Função para marcar ou desmarcar a tarefa
function clickItem(evento){ // Utilização de um Event Listener para captar eventos de clique
    let elemento = evento.target // Definição da variável 'elemento' para receber o alvo do clique
    if (elemento.type === 'button'){ // Condicional para caso o clique seja realizado no botão de remover tarefa
        const indice = elemento.dataset.indice; // Definição da constante que receberá o índice do tarefa
        removerItem (indice); // Chamada da função para remover a tarefa
    }else if (elemento.type === 'checkbox') { // Condicional para caso o clique seja na checkbox
        const indice = elemento.dataset.indice;
        atualizarItem (indice); // Chamada da função para atualizar a marcação da tarefa 
    }
}

// Função para atualizar a marcação da tarefa
function atualizarItem(indice){
    if(banco[indice].status === ''){
        banco[indice].status = 'checked' // Se a tarefa estiver com o status desmarcado (vazio), ela será
                                         // marcada como 'checked'
    }else if(banco[indice].status === 'checked'){
        banco[indice].status = ''// Se a tarefa estiver com o status 'checked', ela será marcada como 
                                 // desmarcado (vazio)
    }
    atualizarTela() // Chamadas da função para atualizar a tela
}

// Função para remover tarefas
function removerItem(indice){
    banco.splice(indice, 1); // Método splice para remover a tarefa pelo seu índice da array'banco'
    atualizarTela();
}

atualizarTela();

// Adição dos Event Listeners às classes dos itens aonde são necessárias as ações: 
// função de adicionar tarefas (keypress- teclado); função de marcar ou excluir tarefas (click- cliques do mouse)
document.querySelector('.tarefas-novo-item').addEventListener('keypress', inserirItem);
document.querySelector('.tarefas-lista').addEventListener('click', clickItem);
