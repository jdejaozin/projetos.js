// Variável de ambiente
let validationForm = document.querySelector('.validate');
// Variável recebendo o formulário de preenchimento

// Definição de um objeto que irá receber as funções que serão utilizadas
let validation = {

    // Arrow function para gerenciar a validade das informações passadas, o paramêtro event(evento) é
    // passado como argumento para que seja possível usa-lo no comando (prevent.Default())
    handleSubmit:(event)=>{
        event.preventDefault();
        // Essa linha de comando faz com o que o formulário não seja enviado, no caso deste código esse
        // comando é necessário para que ao confirmar o navegador não leve o usuário para uma página
        // ainda inexistente
        
        let allInputs = validationForm.querySelectorAll('input');
        // Com o 'querySelectorAll' estou pegando todos os campos de input e adicionando em um array
        
        validation.clearErrors();
        // Chamada da função do objeto para limpar as notificações de erros anteriores

        // Laço de repetição para a verificação de todos os inputs e suas validações
        for(let i=0; i < allInputs.length; i++){  
            let input = allInputs[i];
            // Variável para alcançar cada input definido

            let check = validation.checkInput(input);
            // Variável recebendo o 'return' da função checkInput() para ser feita a checagem se existe
            // ou não alguma coisa em discordância com as regras definidas, e caso exista a discordância
            // a variável irá receber o texto do que está errado para repassar para a função que irá mostrar
            // ao usuário a discordância em questão

            // Verificação da checagem
            if(check !== true){
                validation.showError(input, check);
                // Chamada da função que, se existir, irá passar para o usuário que está errado
            }
        }
        /*
        if(send){
            let send = true;
            validationForm.submit();
        }*/
    },

    // Arrow function que irá verificar as regras para cada input, para isso a função está recebendo o
    // input como argumento
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        // Variável que irá receber o atributo 'data-rules' definido no HTML, atributo que foi definido
        // recebendo como valor as regras definidas para cada input

        // Validação das regras. Se houver regras, ou seja, rules diferente de nulo, o processamento do 'if'
        // irá acontecer
        if(rules !== null){
            rules = rules.split('|'); 
            // Ao usar o split() estou separando as regras caso existe mais de 1 regra, para indicar o que 
            // separa uma regra da outra utilizei o pipe (|) na definição das regras no HTML. O split()
            // irá separar a string nos pontos indicados e irá criar uma array

            // Laço de repetição para verificar cada regra separadamente
            for(let r in rules){
                let ruleDetails = rules[r].split('=');
                // Esse split() segue a mesma linha de raciocínio do anterior. Nesse caso a lógica para seu
                // uso é um pouco mais estrita, pois uma das regras definidas para esse formulário é o 
                // minímo de caracteres para a senha, e o minímo de caracteres necessários foi definido 
                // no HTML após o '=', assim o split() faz a separação da regra isolando o número que 
                // representa minímo de caracteres a serem digitados

                // Switch/case para verificação das regras definidas, já está sendo passado o argumento
                // ruleDetails[0] pois nas regras definidas o indicador do que está errado será sempre
                // o primeiro elemento a aparecer
                switch(ruleDetails[0]){
                    case 'required':
                        // Caso o campo seja essencial para o cadastro o usuário
                        if(input.value === ''){
                            return 'Campo não pode ser vazio.';
                            // Retorno do texto que irá aparecer para o usuário
                        }
                    break;
                    case 'min':
                        // Caso exista um valor mínimo de caracter para determinado campo
                        if(input.value.length < ruleDetails[1]){
                            return `O campo deve ter pelo menos ${ruleDetails[1]} caracteres.`;
                            // Retorno do texto que isrá aparecer para o usuário, o elemento
                            // 'ruleDetails[1]' é o que recebe o número mínimo de caracteres e repassa
                            // para o usuário
                        }
                    break;
                    case 'email':
                        // Caso o tipo de e-mail não seja válido

                        let regex = /^[a-z0-9\w]+@[a-z0-9]+\.+[a-z]+(\.[a-z]+)?$/gi;
                        // Definição da variável que irá receber a expressão regular para o teste abaixo
                        if(!regex.test(input.value)){
                            // Utilizando a negação (!) no teste, caso o valor do input não obedeça as
                            // regras definidas no 'regex' o texto abaixo é retornado
                            return 'Insira um e-mail válido';
                        }
                    break;
                    case 'equal':
                        // Caso as senhas digitadas não sejam identicas

                        let pass = document.querySelector('.password')
                        // Definição da variável que receberá o elemento password, onde é inserida a senha

                        // Estrutura condicional para caso os valores informados em ambos inputs sejam 
                        // diferentes
                        if(pass.value !== input.value){
                            return 'As senhas são diferentes'
                        }
                    break;
                }
            }
        }
        return true;
        // Retorno true para indicar que o input em questão está de acordo com as regras definidas
    },

    // Arrow function que irá receber o input e suas regras, os argumentos 'input' e 'error' estão sendo
    // passados para que sejam feitas as alterações no HTML
    showError:(input, error) => {
        input.style.borderColor = "#FF0000";
        // Comando para mudar a cor da borda do input que estiver fugindo das regras definidas

        let errorElement = document.createElement('div'); 
        // Criação de uma nova div para apresentar o erro

        errorElement.classList.add('error'); 
        // Adicionando a classe 'error' na div criada, essa classe já está definida no CSS com as alterações
        // que ela adiciona na div
        errorElement.innerHTML = error;
        // A div recebera e exibira o texto de não confirmação passado como argumento

        input.parentElement.insertBefore(errorElement, input);
        // A div será inserida como um elemento antes do input (1° argumento= o que será inserido 
        // 2° argumento= antes de qual elemento ele será inserido)
    },

    // Arrow function que irá fazer a remoção das divs para que não exista duplicação de divs
    clearErrors:() => {
        let inputs = validationForm.querySelectorAll('input');
        // Seleção de todos os inputs para realizar o laço de repetição abaixo
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style='';
            // Comando para resetar o estilo de todos os inputs
        }

        let errorElements = document.querySelectorAll('.error') 
        // Seleção de todos os elementos que possuem a classe 'error' para realizar o laço de repetição
        // abaixo
        for(let i = 0; i < errorElements.length; i++){
            errorElements[i].remove();
            // Remoção da classe 'error' de todos os elementos que foram selecionados
        }
    }
};

validationForm.addEventListener('submit', validation.handleSubmit);
// Escuta de evento (EventListener) definida para o formulário, definindo o evento 'submit' faz com que o
// evento só seja disparado após submeter o formulário, assim todas as informações dos inputs são alcançadas