"use strict";

fetch('projets.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Impossible de charger le fichier JSON');
        }
        return response.json();
    })
    .then((data) => {
        // Le contenu du fichier JSON est maintenant dans la variable "data"
        // Vous pouvez le traiter comme un objet JavaScript
        const projets = data;

        const sectionProjetTitle = document.querySelector('.sectionProjet__title');

        // Sélectionnez les liens de filtre
        const filtreOptions = document.querySelectorAll('.sectionProjet__filterBar a');

        // Sélectionnez la grille de projets
        const projetGrid = document.getElementById('projetGrid');

        // Écoutez les clics sur les liens de filtre
        // Écoutez les clics sur les liens de filtre
        filtreOptions.forEach((option) => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                filtreOptions.forEach((opt) => {
                    opt.classList.remove('active');
                });

                // Ajoutez la classe "active" à l'option sélectionnée
                option.classList.add('active');

                // Récupérez l'option sélectionnée
                const selectedOption = option.getAttribute('data-option');
                console.log(selectedOption);


                // Masquez les éléments de la grille en ajustant l'opacité
                const gridItems = projetGrid.querySelectorAll('a');
                gridItems.forEach((item) => {
                    item.style.opacity = 0; // Opacité à 0 pour masquer les éléments
                });

                // Filtrer les projets en fonction de l'option sélectionnée
                const projetsFiltres = projets.filter((projet) => projet.option === selectedOption);

                // Générez le HTML des projets filtrés
                const titlePage = projetsFiltres.length > 0 ? projetsFiltres[0].optionTitle : '';

                
                sectionProjetTitle.innerHTML = titlePage;

                // Générez le HTML des projets filtrés
                const projetHTML = projetsFiltres.map((projet) => {
                    return `
                        <a href="details.php?id=${projet.id}" style="background-image: url('${projet.image}');">
                            <p>${projet.nom}<img src="${projet.picto}" alt="${projet.nom}"></p>
                        </a>
                    `;
                }).join('');


                // Attendez un court délai avant de réafficher les éléments de la grille avec l'opacité
                setTimeout(() => {
                    // Réaffichez les éléments de la grille avec l'opacité


                    // Remplacez le contenu de la grille avec les projets filtrés
                    projetGrid.innerHTML = projetHTML;

                }, 300);

                setTimeout(() => {
                    // Réaffichez les éléments de la grille avec l'opacité


                    // Remplacez le contenu de la grille avec les projets filtrés
                    const gridItems = projetGrid.querySelectorAll('a');
                    gridItems.forEach((item) => {
                        item.classList.add('active') // Opacité à 0 pour masquer les éléments
                    });
                }, 400);
                // 300 millisecondes (0.3 secondes) correspondant à la durée de votre transition d'opacité
            });
        });


    })
    .catch((error) => {
        console.error(error);
    });


    document.addEventListener('DOMContentLoaded', function () {
        const allElements = document.querySelectorAll('.sectionProjet__filterBar a');
    
        allElements.forEach((element, index) => {
            element.addEventListener('click', function (event) {
                event.preventDefault(); // Empêche le comportement par défaut du lien
    
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
    
    
