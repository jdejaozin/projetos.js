// Variáveis de controle de interface
let totalSlides = document.querySelectorAll(".slider-item").length;
let sliderWidth = document.querySelector(".slider").clientWidth;

// Variáveis de controle de ambiente
let currentSlide = 0;

// Alteração da largura do slider de acordo com o tamanho total das imagens adicionadas
document.querySelector(".slider-width").style.width = `${sliderWidth * totalSlides}px`;
// Alteração da largura e altura dos controles do slide de acordo com o tamanho do espaço reservado para as imagens 
document.querySelector(".slider-controls").style.width = `${sliderWidth}px`;
document.querySelector('.slider-controls').style.height = `${document.querySelector('.slider').clientHeight}px`;

// Função para ir para a imagem anterior
function goPrev(){
    currentSlide --; // Diminuição da variável correspondente a imagem atual

    if(currentSlide < 0){ // Estrutura condicional para caso esteja na primeira imagem ao voltar ser direcionado
                          // para a última imagem
        currentSlide = totalSlides - 1
    };

    updateMargin(); // Chamada da função que atualiza a margem
};

// Função para ir para a próxima imagem
function goNext(){
    currentSlide ++; // Acrescimo da váriavel corresponde a imagem atual

    if(currentSlide > (totalSlides - 1)){ // Estrutura condicional para caso esteja na última imagem ao avançar
                                          // ir para a primeira imagem
        currentSlide = 0
    };

    updateMargin(); // Chamada da função que atualiza a margem
}

// Função para atualizar a margem
function updateMargin(){
    // Definição da variável que irá receber o tamanho do slider
    let sliderItemWidth = document.querySelector(".slider-item").clientWidth;
    // Definição da variável que irá receber a nova margem respectiva a imagem atual
    let newMargin = (currentSlide * sliderItemWidth);
    // Atualização da margem do slider de acordo com a imagem atual
    document.querySelector('.slider-width').style.marginLeft = `-${newMargin}px`;
}