"use strict";

//Varibles
const discoverButton = document.querySelector('.sectionWS__button');
const fillingSVG = document.querySelector('.sectionWS__svg:last-of-type path');
const wrapperWS = document.querySelector('.sectionWS__wrapper');
const sectionWS = document.querySelector('.sectionWS');



discoverButton.addEventListener('click', () =>{
    clickDiscoverButton();

});

function clickDiscoverButton  () {
    discoverButton.classList.add('isClick');
    fillingSVG.classList.add('fillingSVG');
    setTimeout(function(){screenFilling(wrapperWS);}, 1500);
    

}
wrapperWS.addEventListener('click', function () {
    // const h1Height = this.querySelector('h1').offsetHeight;
    // const h2Height = this.querySelector('h2').offsetHeight;
    // const totalHeight = h1Height + h2Height;

    // this.style.setProperty('--total-height', totalHeight + 'px');
    // this.classList.toggle('fillingScreen');

    
});

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
    document.querySelectorAll('svg').forEach(function (e) {
        e.classList.add('opacity');
    })

};
