"use strict";

//import des modules
import {gsap} from "gsap";
import CustomEase from "gsap/CustomEase";
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Importer le chargeur glTF

// Utilisez GSAP avec CustomEase pour créer vos animations
gsap.registerPlugin(CustomEase);
console.log(THREE.version);

//Variables

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
let interval = 800
let imageInterval



//Fonction chargement du cercle de chargment
CustomEase.create("custom", "M0,0 C0.487,0 0.227,0.625 0.488,0.778 0.56,0.82 0.888,1 1,1 ")
CustomEase.create("custom2", "M0,0 C0.021,0.065 0.254,0.008 0.258,0.098 0.284,0.728 0.17,1 1,1 ")

let loadingDuration = (interval * 7)
let loadingDurationGSAP = (interval * 7) / 1000
function fillLoading(){
    gsap.to(loadingSvg,{duration:loadingDurationGSAP,strokeDashoffset:0,ease: "custom",onComplete:function(){
        gsap.to(sectionLoading,{duration:3,top:'-100%',ease: "custom2",opacity:0 });
    }
    })
}


const t = document.querySelector('h1')

document.addEventListener('DOMContentLoaded', () => {
    
t.addEventListener('click', function (){

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



})})