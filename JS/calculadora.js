// Variáveis de controle interface
let resultado = window.document.getElementById('resultado');

// Variáveis de controle
let numeros = [];
let operador = ''


// Função para identificar os campos clicados
function clicou(n){

    resultado.value += n; // Variável recebendo os números para exibir na tela
    // Estruturas condicionais para identificar os operadores e obter os números clicados
    if(n === '+'){

        numeros = []
        res = resultado.value.replace(/\+/g,'') // Obtenção das strings excluindo os operadores
        let num = Number(res); // Transformação das strings para o tipo number para realizar as operações
        numeros.push(num) // Método push para adicionar o número na array 'numeros'
        resultado.value = '' // Definição vazia para zerar o valor para o próximo número
        operador = 'somar' // Atribuição da variável que será responsável por identificar o operador


    }else if(n === '-'){

        numeros = []
        res = resultado.value.replace(/\-/g,'')
        let num = Number(res);
        numeros.push(num)
        resultado.value = ''
        operador = 'subtrair'

    }else if(n === '*'){

        numeros = []
        res = resultado.value.replace(/\*/g,'')
        let num = Number(res);
        numeros.push(num)
        resultado.value = ''
        operador = 'multiplicar'

    }else if(n === '/'){

        numeros = []
        res = resultado.value.replace(/\//g,'')
        let num = Number(res);
        numeros.push(num)
        resultado.value = ''
        operador = 'dividir'

    }

    if(n === '='){
        igual() // Chamada da função que será responsável pela realização das operações
    }
};

// Função para realizar as operações
function igual(){

    let resposta = undefined
    let num = Number(resultado.value);
    numeros.push(num)
    // Estruturas condicionais para a identificação dos operadores
    if(operador === 'somar'){
        resposta = numeros[0]+numeros[1] // Variável resposta recebendo o valor final da respectiva operação
        resultado.value = resposta // Variável recebendo o resultado para mostrar na tela do usuário

    }else if(operador === 'subtrair'){
        resposta = numeros[0] - numeros[1]
        numeros = [resposta]
        resultado.value = resposta

    }else if(operador === 'multiplicar'){
        resposta = numeros[0] * numeros[1]
        numeros = [resposta]
        resultado.value = resposta

    }else if(operador === 'dividir'){
        resposta = numeros[0] / numeros[1]
        numeros = [resposta]
        resultado.value = resposta

    }    
}
// Função da tecla limpar
function limpar(){
    resultado.value='';
    numeros = []
};