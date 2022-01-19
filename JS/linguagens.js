let menuToggle = document.querySelector('.toggle');
let navigation = document.querySelector('.headerNavigation');

menuToggle.addEventListener("click", function(){
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
})


let thumbHtml = document.querySelector('.html');
let thumbCss = document.querySelector('.css');
let thumbJs = document.querySelector('.js');
let thumbNodeJs = document.querySelector('.nodeJs');



let thumbElement = document.querySelectorAll(".thumb li");
for(let i = 0; i < thumbElement.length; i++){
    thumbElement[i].onclick = function() {
        let c = 0;
        while(c < thumbElement.length){
            thumbElement[c++].className = 'check';
        }
        thumbElement[i].className = "check active";
    }
}


function imgSlider(source){
    let language = document.querySelector('.language');
    language.src = "Images/"+source;
}

function changeBgColor(color){
    let bg = document.querySelector('.background')
    bg.style.background = color;
}

thumbHtml.addEventListener("click", function(){imgSlider("html5-original-wordmark.svg")});
thumbCss.addEventListener("click", function(){imgSlider("css3-original-wordmark.svg")});
thumbJs.addEventListener("click", function(){imgSlider("javascript-original.svg")});
thumbNodeJs.addEventListener("click", function(){imgSlider("nodejs-original.svg")});

thumbHtml.addEventListener("click", function(){changeBgColor("#ee7c4a")});
thumbCss.addEventListener("click", function(){changeBgColor("#3b93c6")});
thumbJs.addEventListener("click", function(){changeBgColor("#f7e662")});
thumbNodeJs.addEventListener("click", function(){changeBgColor("#9cbe71")});
 