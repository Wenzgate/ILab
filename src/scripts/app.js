"use strict";

import Twig from 'twig'
import $ from 'jquery';

import {gsap} from "gsap";
import CustomEase from "gsap/CustomEase";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Importer le chargeur glTF


gsap.registerPlugin(CustomEase);
console.log(THREE.version);

//Variables
const mainElement = document.querySelector('html');
let renderedProject
const sectionLoading = document.querySelector('.sectionLoading');
const loadingImg = document.querySelector('.sectionLoading__img img');
const loadingSvg = document.querySelector('.sectionLoading__svg circle');
const imageUrls = [
    'assets/images/picto_anim2d.svg',
    'assets/images/picto_anim3d.svg',
    'assets/images/picto_vfx.svg',
    'assets/images/picto_ir.svg',
    'assets/images/picto_cg.svg',
    'assets/images/picto_jv.svg'
];

//Fonction boucle image de la sectionLoading
let currentIndex = 0;
let interval = 500
let imageInterval



//Fonction chargement du cercle de chargment
CustomEase.create("custom", "M0,0 C0.487,0 0.227,0.625 0.488,0.778 0.56,0.82 0.888,1 1,1 ")
CustomEase.create("custom2", "M0,0 C0.021,0.065 0.254,0.008 0.258,0.098 0.284,0.728 0.17,1 1,1 ")

let loadingDuration = (interval * 7)
let loadingDurationGSAP = (interval * 7) / 1000

let projets = []; // Variable pour stocker les projets

// // Code pour le chargement initial des projets
fetch('assets/database/projets.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Impossible de charger le fichier JSON');
        }
        return response.json();
    })
    .then((data) => {
        projets = data; // Stockez les projets dans la variable projets

        const sectionProjetTitle = document.querySelector('.sectionProjet__title');
        const filtreOptions = document.querySelectorAll('.sectionProjet__filterBar a');
        const projetGrid = document.getElementById('projetGrid');

        filtreOptions.forEach((option) => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                filtreOptions.forEach((opt) => {
                    opt.classList.remove('active');
                });

                option.classList.add('active');
                const selectedOption = option.getAttribute('data-option');
                console.log(selectedOption);

                const gridItems = projetGrid.querySelectorAll('a');
                gridItems.forEach((item) => {
                    item.style.opacity = 0;
                });

                const projetsFiltres = projets.filter((projet) => projet.option === selectedOption);
                const titlePage = projetsFiltres.length > 0 ? projetsFiltres[0].optionTitle : '';

                sectionProjetTitle.innerHTML = titlePage;

                const projetHTML = projetsFiltres.map((projet) => {
                    return `
                        <a class="active sectionProjet__grid__link " data-option="${projet.option}" data-id="${projet.id}" href="javascript:void(0);" style="background-image: url('${projet.image}');">
                            <p>${projet.nom}<img src="${projet.picto}" alt="${projet.nom}"></p>
                        </a>
                    `;
                }).join('');

                setTimeout(() => {
                    projetGrid.innerHTML = projetHTML;

                    const gridItems = projetGrid.querySelectorAll('a');
                    gridItems.forEach((item) => {
                        item.style.opacity = 1;
                    });
                }, 300);
            });
        });
    })
    .catch((error) => {
        console.error(error);
    });

//Fonction animation barre de filtre
document.addEventListener('DOMContentLoaded', function () {
    const allElements = document.querySelectorAll('.sectionProjet__filterBar a');
    allElements.forEach((element, index) => {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            // Supprimez toutes les classes actives sur les éléments
            allElements.forEach(el => el.classList.remove('active'));
            // Ajoutez la classe active à l'élément cliqué
            element.classList.add('active');
            // Supprimez toutes les classes spéciales sur les éléments
            allElements.forEach(el => {
                el.classList.remove('class1', 'class2', 'class3', 'class4');
            });
            // Ajoutez des classes spéciales aux éléments en fonction de l'élément actif
            if (index === 0) {
                allElements[1].classList.add('class1');
                allElements[6].classList.add('class2');
            } else if (index === 1) {
                allElements[0].classList.add('class3');
                allElements[2].classList.add('class1');
                allElements[6].classList.add('class2');
            } else if (index === 2) {
                allElements[0].classList.add('class1');
                allElements[1].classList.add('class2');
                allElements[3].classList.add('class1');
                allElements[6].classList.add('class2');
            } else if (index === 3) {
                allElements[0].classList.add('class1');
                allElements[2].classList.add('class2');
                allElements[4].classList.add('class1');
                allElements[6].classList.add('class2');
            } else if (index === 4) {
                allElements[0].classList.add('class1');
                allElements[3].classList.add('class2');
                allElements[5].classList.add('class1');
                allElements[6].classList.add('class2');
            } else if (index === 5) {
                allElements[0].classList.add('class1');
                allElements[4].classList.add('class2');
                allElements[6].classList.add('class3');
            } else if (index === 6) {
                allElements[0].classList.add('class1');
                allElements[5].classList.add('class2');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {

// Gestionnaire d'événements pour les liens dans #projetGrid
document.getElementById('projetGrid').addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'A') {
        event.preventDefault();
        const option = target.getAttribute('data-option');
        const projectId = target.getAttribute('data-id');
        chargerElements(option, projectId);
        sectionLoading.style.display = 'flex'
    console.log('hey')
fillLoading();



// Fonction pour afficher la hiérarchie des objets
function logObjectHierarchy(object, indent = 0) {
  console.log(' '.repeat(indent) + object.name);
  object.children.forEach((child) => {
    logObjectHierarchy(child, indent + 2);
  });
}

// Options de configuration
const options = {
  wrapper: document.querySelector('.wrapperCanvas'),
  canvas: document.querySelector('.tj-canvas'),
  sizes: {},
};

options.sizes.w = options.wrapper.clientWidth;
options.sizes.h = options.wrapper.clientHeight;

// Limite de la densité de pixels à 2 pour éviter les problèmes de performance sur les écrans haute densité.
options.sizes.dpr = Math.min(window.devicePixelRatio, 2);

// Tableau des noms de fichiers des modèles GLB
const modelFiles = [
  'model1.glb',
  'model2.glb',
  'model3.glb',
  'model4.glb',
  'model5.glb',
  'model6.glb',
  'model7.glb'
];

class Viewer {
  constructor(canvas) {
    this.canvas = canvas;
    this.setRenderer();
    this.createScene();
    this.loadGLBModel();
    this.startRotation();
    this.renderScene();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,

      alpha: true, // Active la transparence

    });

    this.renderer.setClearColor(0x000000, 0); // Couleur noire, opacité 0 (transparent)


    this.renderer.setSize(options.sizes.w, options.sizes.h);
    this.renderer.setPixelRatio(options.sizes.dpr);

    this.camera = new THREE.PerspectiveCamera(75, options.sizes.w / options.sizes.h, 1, 1000);
    this.camera.position.z = 50;

    this.scene = new THREE.Scene();

    this.modelIndex = 0; // Index du modèle actuellement affiché
    this.currentRotationAngle = 0; // Angle de rotation actuel
  }

  createScene() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  }

  loadGLBModel() {
    const loader = new GLTFLoader();

    loader.load(`assets/models/${modelFiles[this.modelIndex]}`, (glb) => {
      this.currentModel = glb.scene;
      console.log('Modèle chargé avec succès !');

      // Ajustez l'échelle du modèle (dans cet exemple, agrandissement par un facteur de 2)
      this.currentModel.scale.set(100, 100, 100);
      this.currentModel.rotation.x = 20.5;


      // Appliquez l'angle de rotation actuel au nouveau modèle
      this.currentModel.rotation.z = this.currentRotationAngle;

      // Ajoutez le modèle à votre scène existante
      this.scene.add(this.currentModel);

      console.log('Objets dans la scène :', this.scene.children);
      console.log('Objets dans le groupe "Scene" :', this.currentModel.children);
      console.log('Hiérarchie des objets :');
      logObjectHierarchy(this.currentModel);
    });
  }

  startRotation() {
    const rotateModel = () => {
      if (this.currentModel) {
        // Rotation de l'objet autour de l'axe Z
        this.currentModel.rotation.z += 0.008;

        // Mettez à jour le rendu
        this.renderer.render(this.scene, this.camera);
      }

      // Appelez récursivement cette fonction pour créer une animation fluide
      requestAnimationFrame(rotateModel);
    };

    // Créez un intervalle pour changer de modèle toutes les 2 secondes
    const modelChangeInterval = setInterval(() => {
      // Supprimez le modèle actuel de la scène
      if (this.currentModel) {
        this.scene.remove(this.currentModel);
      }

      // Incrémentez l'index du modèle
      this.modelIndex = (this.modelIndex + 1) % modelFiles.length;

      // Chargez le modèle suivant
      this.loadGLBModel();

      // Appliquez l'angle de rotation actuel au nouveau modèle
      this.currentRotationAngle = this.currentModel.rotation.z;

    }, loadingDuration / 6); // Changez de modèle toutes les 2 secondes

    // Ajoutez un gestionnaire d'événement pour effacer l'intervalle lorsque le modèle est détruit
    this.renderer.domElement.addEventListener('remove', () => {
      clearInterval(modelChangeInterval);
    });

    rotateModel(); // Démarrez la rotation
  }

  renderScene() {
    const animate = () => {
      if (this.currentModel) {
        // Rotation de l'objet autour de l'axe Z
        this.currentModel.rotation.z += 0.005;
      }

      // Mettez à jour le rendu
      this.renderer.render(this.scene, this.camera);

      // Appelez cette méthode de manière récursive pour créer une animation fluide
      requestAnimationFrame(animate);
    };

    animate();
  }
}

  const myViewer = new Viewer(options.canvas);
    }
});

});

// Fonction pour charger les éléments d'un projet
function chargerElements(option, projectId) {
    loader()
    // Chargez les données du projet via AJAX
    fetch('get_project_data.php?id=' + projectId + '&option=' + option)
        .then(response => response.json())
        .then(data => {
            // Utilisez l'option pour déterminer le template à utiliser
            const templatePath = 'templates/' + option + '.php';

            // Chargez le template Twig via AJAX
            fetch(templatePath)
                .then(response => response.text())
                .then(template => {
                    // Utilisez les données du projet et le template pour afficher le projet
                    renderedProject = Twig.twig({ data: template }).render({ data: data });
                    renderedProject = response;

                    // Assurez-vous d'avoir un élément 'main' dans votre HTML
                    

                    // Réattachez les gestionnaires d'événements pour les éléments dans le projet chargé dynamiquement
                    
                })
                .catch(error => console.error('Erreur lors du chargement du template Twig', error));
        })
        .catch(error => console.error('Erreur lors du chargement des données du projet', error));
}



function loader () {
   

    
    
    
}

// Fonction pour attacher les gestionnaires d'événements pour les éléments dynamiques
function attacherGestionnairesEvenements() {
    // Sélectionnez les éléments sur lesquels vous souhaitez attacher des gestionnaires d'événements
    const allElements2 = document.querySelectorAll('.navigationItem__link2');
    const boutonLike = document.querySelector('.navigationItem:last-of-type');


    
    let scrollPosition

    allElements2.forEach((element, index) => {
        element.addEventListener('click', function (event) {
            event.preventDefault();
            
            // // Supprimez toutes les classes actives sur les éléments
            // allElements2.forEach(el => el.classList.remove('active'));

            // // Ajoutez la classe active à l'élément cliqué
            // element.classList.add('active');

            // // Supprimez toutes les classes spéciales sur les éléments
            // allElements2.forEach(el => {
            //     el.classList.remove('class1', 'class2', 'class3', 'class4');
            // });

            // // Ajoutez des classes spéciales aux éléments en fonction de l'élément actif
            // if (index === 0 ) {
            //     allElements2[1].classList.add('class1');
            //     allElements2[3].classList.add('class2');
            // } else if (index === 1) {
            //     allElements2[0].classList.add('class3');
            //     allElements2[2].classList.add('class1');
            //     allElements2[3].classList.add('class2');
            // } else if (index === 2) {
            //     allElements2[0].classList.add('class1');
            //     allElements2[1].classList.add('class2');
            //     allElements2[3].classList.add('class3');
            // } else if (index === 3) {
            //     allElements2[0].classList.add('class1');
            //     allElements2[2].classList.add('class2');   
            // } 
        });
    });

    boutonLike.addEventListener('click', function(){
        var imgElement = document.querySelector(".navigationItem:last-of-type img");
        imgElement.src = "assets/images/likeRed.svg";
    })

    
  

    const mainElement = document.querySelector('main');

mainElement.addEventListener('scroll', function() {
    let sec1Height = document.querySelector('#section1').offsetHeight;
    let sec1Top = document.querySelector('#section1').offsetTop;
    let TotalValue1 = sec1Height + sec1Top

    let sec2Height = document.querySelector('#section2').offsetHeight;
    let sec2Top = document.querySelector('#section2').offsetTop;
    let TotalValue2 = sec2Height + sec2Top

    let sec3Height = document.querySelector('#section3').offsetHeight;
    let sec3Top = document.querySelector('#section3').offsetTop;
    let TotalValue3 = sec3Height + sec3Top

    let sec4Height = document.querySelector('#section4').offsetHeight;
    let sec4Top = document.querySelector('#section4').offsetTop;
    let TotalValue4 = sec4Height + sec4Top

    let sec5Height = document.querySelector('#section5').offsetHeight;
    let sec5Top = document.querySelector('#section5').offsetTop;
    let TotalValue5 = sec5Height + sec5Top



    console.log(sec1Height + sec1Top);
    let scrollPosition = mainElement.scrollTop;
    console.log('Position de scroll : ' + scrollPosition + 'la heuteur de la sec 1 :' + sec1Height);

    allElements2.forEach(el => el.classList.remove('active'));

        // Ajoutez la classe active à l'élément cliqué
      

        // Supprimez toutes les classes spéciales sur les éléments
        allElements2.forEach(el => {
            el.classList.remove('class1', 'class2', 'class3', 'class4');
        });

        // Ajoutez des classes spéciales aux éléments en fonction de l'élément actif
        if (scrollPosition >= 0 && scrollPosition <= TotalValue1) {
            allElements2[0].classList.add('active');
            allElements2[1].classList.add('class1');
            allElements2[4].classList.add('class2');
        } else if (scrollPosition >= TotalValue1 && scrollPosition <= TotalValue2) {
            allElements2[0].classList.add('class3');
            allElements2[1].classList.add('active');
            allElements2[2].classList.add('class1');
            allElements2[4].classList.add('class2');
        } else if (scrollPosition >= TotalValue2 && scrollPosition <= TotalValue3) {
            allElements2[0].classList.add('class1');
            allElements2[1].classList.add('class2');
            allElements2[2].classList.add('active');
            allElements2[3].classList.add('class1');
            allElements2[4].classList.add('class2');
        } else if (scrollPosition >= TotalValue3 && scrollPosition <= TotalValue4) {
            allElements2[0].classList.add('class1');
            allElements2[2].classList.add('class2');  
            allElements2[3].classList.add('active'); 
            allElements2[4].classList.add('class3');
        } else if (scrollPosition >= TotalValue4 && scrollPosition <= TotalValue5) {
            allElements2[0].classList.add('class1');
            allElements2[3].classList.add('class2');
            allElements2[4].classList.add('active');
        }
});
      
      function scrollTo(element) {
        document.querySelector('main').scroll({
          behavior: 'smooth',
          left: 0,
          top: element.offsetTop - 32
        });
      }

      document.querySelectorAll(".navigationItem__link2").forEach((link) => {
        link.addEventListener('click', () => {
console.log('hey')
            const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        console.log(section)
            scrollTo(section);
      })
      
      
      });

      const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");
const closeButton = document.getElementById("close-button");

// Fonction pour afficher la fenêtre pop-up
function openPopup(imageSrc) {
  popupImage.src = imageSrc;
  popup.style.display = "flex";
}

// Fonction pour fermer la fenêtre pop-up
function closePopup() {
  popup.style.display = "none";
}

// Ajoutez des écouteurs d'événements pour ouvrir et fermer la fenêtre pop-up
const imageItems = document.querySelectorAll("img");

imageItems.forEach((image) => {
  image.addEventListener("click", () => {
    openPopup(image.src);
  });
});

closeButton.addEventListener("click", closePopup);
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    closePopup();
  }
});


    
    // Réactivez l'écouteur d'événement de la deuxième fonction après un court délai
     // Vous pouvez ajuster la durée en millisecondes (500ms = 0,5 seconde)
}    

// fetch('database/projets.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Impossible de charger le fichier JSON');
//         }
//         return response.json();
//     })
//     .then(data => {
//         const projets = data;

//         // Appeler la fonction de configuration pour les filtres de projet avec les données chargées initialement
//         setupProjectFilter(projets);
//     })
//     .catch(error => {
//         console.error(error);
//     });

function fillLoading(){
  gsap.to(loadingSvg,{duration:loadingDurationGSAP,strokeDashoffset:0,ease: "custom",onComplete:function(){
      gsap.to(sectionLoading,{duration:1.5,y:'-70%',ease: "custom2",opacity:0,onComplete:function(){
        mainElement.innerHTML = renderedProject;
        attacherGestionnairesEvenements();
      } });
  }
  })
}