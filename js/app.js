const redButton = document.querySelector("#red");
const greenButton = document.querySelector("#green");
const blueButton = document.querySelector("#blue");
const yellowButton = document.querySelector("#yellow");
const purpleButton = document.querySelector("#purple");
const roundNumber = document.querySelector(".round-number")
const checkButton = document.querySelector(".check-button");
const buttonToggle = document.querySelector(".button-toggle");
const body = document.body;


let roundValue = 1; 
let clueChildNumber = 1;
let roundChildNumber = 1;


//  ## Sélection aléatoire des couleurs de l'ordinateur ##
const computerColorsList = ['red', 'green', 'blue', 'yellow', 'purple'];

function computerColorsSelection(){

    const computerColorsSequence = [];
    
    for (let i = 0; i < 4; i++) {  

        const position = Math.floor(Math.random() * 5);
        computerColorsSequence.push(computerColorsList[position]);

    }

    return computerColorsSequence;

}

const computerColors = computerColorsSelection();
console.log("Couleurs Ordinateur :");
console.log(computerColors);


// Récupération des couleurs utilisateurs + affichage des couleurs ##
let userColors = [];

function userColorsSelection(colorValue, color){

    if(userColors.length < 4){
        userColors.push(colorValue);
    } 

    if(roundChildNumber <= 4){
        document.querySelector(`#board-line-${roundValue} .color-circle:nth-child(${roundChildNumber})`).style.background = color;
        roundChildNumber++;
    }

}

const red = "#FF474E";
const yellow = "#FFC933";
const green = "#82BC24";
const blue = "#1778B5";
const purple = "#614587";

const redValue = "red";
const yellowValue = "yellow";
const greenValue = "green";
const blueValue = "blue";
const purpleValue = "purple";

redButton.onclick = function(){userColorsSelection(redValue, red)};
yellowButton.onclick = function(){userColorsSelection(yellowValue, yellow)};
greenButton.onclick = function(){userColorsSelection(greenValue, green)};
blueButton.onclick = function(){userColorsSelection(blueValue, blue)};
purpleButton.onclick = function(){userColorsSelection(purpleValue, purple)} ;


// ## Comparaison des Couleurs + affichage des indications ##
function colorsComparison(){
    
    let goodColorsValue = [];
    let wrongColorsValue = [];

    let copyComputerColors = computerColors.slice();

    let i = 0;
    while(i < userColors.length){  // ~~ Bonne couleurs ~~

        if(userColors[i] == copyComputerColors[i]){

            userColors.splice(i,1)
            copyComputerColors.splice(i,1);
            document.querySelector(`#clue-line-${roundValue} .clue-circle:nth-child(${clueChildNumber})`).style.background = "#aacc00";
            goodColorsValue++;
            clueChildNumber++;

        } else{

            i++;

        }

    }

    i = 0
    while(i < userColors.length){  // ~~ Mauvaise couleurs ~~

        if(userColors[i] != copyComputerColors[i]){

            wrongColorsValue++;
            userColors.splice(i,1);
            copyComputerColors.splice(i,1);
            document.querySelector(`#clue-line-${roundValue} .clue-circle:nth-child(${clueChildNumber})`).style.background = "#ff3c38";
            clueChildNumber++;

        } else{

            i++;

        }

    }

    return goodColorsValue

}


// ## Relance le jeu ##
function restartGame() {
    location.reload();
}


// ## Victoire ou défaite ##
function victoryDefeat() {
    if(goodColors == 4) {

        const victoryRestart = confirm("Victoire =) ! Cliquer sur OK pour recommencer")
        
        if(victoryRestart) {

            restartGame();

        } else {

        }

    } else {

        roundValue++;
        roundChildNumber = 1;
        clueChildNumber = 1;

        if(roundValue <= 10) {

            roundNumber.innerHTML = "<p>" + `${roundValue}` + "</p>";

        } 

        if(roundValue > 10) {

            const defeatRestart = confirm("Dommage :( ! Cliquer sur OK pour recommencer")
            
            if(defeatRestart) {

                location.reload();

            } else {

            }

        }

        return roundValue

    }

}


// ## Light/Dark Mode ##
buttonToggle.onclick = function() {

    if(body.classList.contains('light')) {

        body.classList.add('dark')
        body.classList.remove('light')

    } else if(body.classList.contains('dark')) {

        body.classList.add('light')
        body.classList.remove('dark')
    
    }

}


checkButton.onclick = function() {

    if(userColors.length != 4){

    } else {

        goodColors = colorsComparison();
        setTimeout(victoryDefeat, 250);

    }

}