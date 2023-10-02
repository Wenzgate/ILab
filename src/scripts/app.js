"use strict";

//import des modules
import {gsap} from "gsap";
import CustomEase from "gsap/CustomEase";

// Utilisez GSAP avec CustomEase pour créer vos animations
gsap.registerPlugin(CustomEase);


console.log(gsap.version);


//Variables
const discoverButton = document.querySelector('.sectionWS__button');
const fillingSVG = document.querySelector('.sectionWS__svg:last-of-type path');
const wrapperWS = document.querySelector('.sectionWS__wrapper');
const sectionWS = document.querySelector('.sectionWS');
const sectionP = document.querySelector('.sectionProjects');
const sectionLoading = document.querySelector('.sectionLoading');
const loadingImg = document.querySelector('.sectionLoading__img img');
const loadingSvg = document.querySelector('.sectionLoading__svg circle');

const url = 'pages/projects.html'; // Remplacez par l'URL de votre page 1

const imageUrls = [
    'assets/images/picto_anim2d.svg',
    'assets/images/picto_anim3d.svg',
    'assets/images/picto_vfx.svg',
    'assets/images/picto_ir.svg',
    'assets/images/picto_cg.svg',
    'assets/images/picto_jv.svg'
];



//Fonction du click du bouton 'discover'
discoverButton.addEventListener('click', () =>{
    clickDiscoverButton();
    // loadPage(url);
    
});

//Fonction général lors du click du bouyton 'discover'
function clickDiscoverButton  () {
    discoverButton.classList.add('isClick');
    fillingSVG.classList.add('fillingSVG');
    loading();
    
}

// Fonction pour agrandir le conteuneur central
function screenFilling (e) {
    const topPosition = e.offsetTop;
    const leftPosition = e.offsetLeft;
    const heightValue = e.offsetHeight;
    const widthValue = e.offsetWidth;
    const nouvelElement = document.createElement('div');


    nouvelElement.style.setProperty('--new-height', heightValue - 72 + 'px');
    nouvelElement.style.setProperty('--new-width', widthValue - 72 + 'px');
    nouvelElement.style.setProperty('--new-top', topPosition  + 'px');
    nouvelElement.style.setProperty('--new-left', leftPosition  + 'px');

    sectionWS.appendChild(nouvelElement);
    nouvelElement.classList.add('fillingScreen');

    wrapperWS.classList.add('opacity');
    discoverButton.classList.add('opacity');
    document.querySelectorAll('.sectionWS svg').forEach(function (e) {
        e.classList.add('opacity');
    })

    nouvelElement.addEventListener('animationend',() => {
        sectionLoading.style.display = 'flex'
        const imageInterval = setInterval(changeImage, interval);
        fillLoading();
    });

};

// Fonction pour charger le contenu de la page 'project' en utilisant AJAX
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            sectionP.innerHTML = data;
        })
        .catch(error => console.error(error));

        window.history.pushState({}, '', url);
}

//Fonction boucle image de la sectionLoading
let currentIndex = 0;
let interval = 300
let imageInterval

function changeImage() {
    if (currentIndex < imageUrls.length) {
        loadingImg.src = imageUrls[currentIndex];
        currentIndex++;
    } else {
        // Toutes les images ont été affichées, donc nous annulons l'intervalle
        clearInterval(imageInterval);
    }
}

//Fonction chargement du cercle de chargment
CustomEase.create("custom", "M0,0 C0.487,0 0.227,0.625 0.488,0.778 0.56,0.82 0.888,1 1,1 ")
CustomEase.create("custom2", "M0,0 C0.021,0.065 0.254,0.008 0.258,0.098 0.284,0.728 0.17,1 1,1 ")

let loadingDuration = (interval * (imageUrls.length + 1))/1000 
function fillLoading(){
    gsap.to(loadingSvg,{duration:loadingDuration,strokeDashoffset:0,ease: "custom",onComplete:function(){
        gsap.to(sectionLoading,{duration:3,top:'-100%',ease: "custom2",opacity:0 });
    }
    })
}

//Fonction générale du loading
function loading(){
    setTimeout(function(){
        screenFilling(wrapperWS);
    }, 1000);
    
}



