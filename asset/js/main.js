// let imgContainer = document.getElementById("img-container")
// let image = document.getElementById("queen")
// let startScreen = document.getElementById("start-screen")
// let scoreCompter = document.getElementById("score-compter")
// let endScreen = document.getElementById("end-screen")
// let winMessage = document.getAnimations("win-message")
// let loseMessage = document.getElementById("lose-message")
// let restarBtn = document.getElementById("restar-button")
// let loseSound = new Audio("asset/sound/giggle10-82651.mp3")
// let winSound = new Audio("asset/sound/possessed-laugh-94851.mp3")
// let allContent = document.getElementById("content")


// let score = 0
// let missedTouch = 0

// //------- Fontion qui permet de faire bouger l'image

// function deplacerImage() {

//     let imgContainerWidth = imgContainer.clientWidth;
//     let imgContainerHeight = imgContainer.clientHeight;

//     let x = Math.floor(Math.random() * (imgContainerWidth - image.clientWidth));
//     let y = Math.floor(Math.random() * (imgContainerHeight - image.clientHeight));

//     image.style.left = x + "px";
//     image.style.top = y + "px";

    
// }
// setInterval(deplacerImage, 1000);

// //------- Function pour l'ecran de demarrage

// function playButton() {
//     startScreen.textContent = "Oses-tu défier la redoutable Reine de Cœur qui rôde sur ton écran ?"
//     queen.style.display = "none"
//     scoreCompter.textContent = ""

//     let startBtn = document.createElement("button")
//     startBtn.textContent = "Commencer"
//     startScreen.appendChild(startBtn)

//     startBtn.addEventListener("click", function () {
//         startBtn.style.display = "none"
//         queen.style.display = "block"
//         startScreen.textContent = ""

//         deplacerImage()
//     })

// }
// playButton()

// //------Fonction pour les scores

// function scoreUpdate() {
//     scoreCompter.textContent = "Score : " + score;
// }

// //------ fonction de gestion de click et de score sur l'image (win)

// image.addEventListener("click", function () {
//     score++;
//     scoreUpdate();
//     deplacerImage()
//     winGame()
// });


// function winGame() {
//     if (score >= 10) {
//         winSound.play(); 
//         endGame(true)  
//     } 
// }

// document.body.addEventListener("click", (event)=>{
//     if (event.target != image) {
//         missedTouch++
//         loseGame();
//     }
// })

// function loseGame() {
//     if (missedTouch >= 3) {
//         loseSound.play();
//         endGame(false)
//     }
// }

// function endGame(isWin) {
//     clearInterval();
//     imgContainer.style.display = "none";

//      if (isWin) {
//         endScreen.textContent = "Bravo ! Tu as gagné !"
//         winMessage.style.display = "block";
//      }else{
//         endScreen.textContent = "Tu as perdu ! Réssaie "
//         loseMessage.style.display = "block"
//      }
//     retryButton()
// }

// function retryButton() {

//     let endBtn = document.createElement("button");

//     endBtn.textContent = "Recommencer";
//     endScreen.appendChild(endBtn);

//     endBtn.addEventListener("click", function () {
//         score= 0;
//         missedTouch = 0
//         scoreUpdate();
//         endScreen.textContent = "";
//         endScreen.innerHTML = "";
//         image.style.display = "";
//         imgContainer.style.display = "";
//         deplacerImage(); 
//     }) 
// }
// retryButton()

// //------ Element de gestion de l'écran de fin de jeu (win)

// function endGame() {
//     score = 0
//     missedTouch =0
//     endGame()
// }

// //--------Element de gestion de l'écran de fin de jeu (lose)


let gameArea = document.getElementById('game-area'); // Zone de jeu
let startButton = document.getElementById('start-button'); // Bouton de démarrage
let restartButton = document.getElementById('restart-button'); // Bouton recommencer
let levelSelector = document.getElementById('level'); // Selecteur de difficulté
let messageDiv = document.getElementById('message'); // Zone pour afficher les message

//------- Déclaration des variables du jeu

let clown, score, missesTouch, gameInterval; 

//------- Ajout d'évenements pour démarrer le jeu au clic sur les boutons

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

//------- Fonction pour démarrer le jeu

function startGame() {
    score = 0; // Réinitialise le code
    missesTouch = 0; //Réinitialise le nombres de raté
    messageDiv.textContent = ''; // Efface le message précédent
    startButton.style.display = 'none'; // Cache le bouton démarrage
    restartButton.style.display = 'none'; //
    
    createClown(); //Crée le clown
    moveClown(); // Fait bouger le clown
}

//------- Fonction pour créer le clown en css

function createClown() {
    clown = document.createElement('div'); // Crée un nouvel élément div pour le clown
    clown.classList.add('clown'); // Ajoute la class '.clown' pour le style css
    gameArea.appendChild(clown); // Ajoute le clownà la zone de jeu
    clown.addEventListener('click', catchClown); // Ajoute un événement au clic sur le clown
    clown.style.display = 'block'; // Rend le clown visible
}

// Fonction pour déplacer le clown

function moveClown() {
    let level = levelSelector.value; // Récupère le niveau séléctionné
    let speed = level === 'easy' ? 2000 : level === 'medium' ? 1000 : 500; // Définit la vitesse de déplacement en fonction du niveau
    
    gameInterval = setInterval(() => { // Déplace le clown à des intervalle réguliers
        let x = Math.random() * (gameArea.clientWidth - 50); // Position horizontale aléatoire
        let y = Math.random() * (gameArea.clientHeight - 50); // Position verticale aléatoire
        clown.style.transform = "translate(" + x + "px, " + y + "px)"; // Applique la transformation
    }, speed);
}

//------- Fonction pour gérer le clic  clown

function catchClown() {
    score++; // Incrémente le score
    if (score === 10) { // vérifie si le score atteint 10
        endGame('Gagné ! Vous avez touché le clown 10 fois !'); // Appel la fontion fin de jeu avec message de victoire
    }
}

//------- Fonction pour gérer la fin du jeu

function endGame(message) {
    clearInterval(gameInterval); // Arrête le mouvement du jeu
    clown.remove(); // Supprime le clown de la zone de jeu
    messageDiv.textContent = message; // Affiche le message de fin
    startButton.style.display = 'none'; // Cache le bouton démarrage
    restartButton.style.display = 'block'; // Affiche le bouton recommencer
}

//-------- block d'évenement pour gérer les clics dans la zone de jeu

gameArea.addEventListener('click', (event) => { // Vérifie si le clic ne concerne pas le clown
    if (!clown.contains(event.target)) { 
        missesTouch++; // Incrémente le nombre de ratés
        if (missesTouch === 3) { // Vérifie si le nombre de ratés atteint 3
            endGame('Perdu ! Vous avez raté 3 fois !'); // Fin du jeu avec message de défaite
        }
    }
});


