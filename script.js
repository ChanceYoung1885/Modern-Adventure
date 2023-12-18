// Game over function
function gameOver() {
    const clearTheScreen = document.getElementById('full-screen');
    clearTheScreen.innerHTML = 
    "<div id='game-over'> <h1>Mass Text: </h1><h2>Sorry guys, I had an emergency come up and have to cancel tonight. Rain check?</h2><button id='restart-button'>Try again?</button><div>";
}

// Game win function
function youWin() {
    const clearTheScreen = document.getElementById('full-screen');
    clearTheScreen.innerHTML = 
    "<div id='game-over'> <h1>How it went: </h1><h2>Turns out you were worried for nothing. Everyone had a great time and they can't wait until you host again, but you can. Haha...</h2><button id='restart-button'>Try again?</button><div>";
}

// Function that changes the Anxiety Level and the color of its text to better represent the urgency and has a game over function
function updateAnxietyLevel(anxietyMod) {
    const anxietyLevelElement = document.getElementById('anxiety-level');
    let newLevel = parseInt(anxietyLevelElement.innerText) + anxietyMod;
    anxietyLevelElement.innerText = newLevel;

    if (newLevel <= 10) {
        anxietyLevelElement.setAttribute('anxiety-num', 'minimal')
    } else if (newLevel < 25) {
        anxietyLevelElement.setAttribute('anxiety-num', 'low')
    } else if (newLevel < 50) {
        anxietyLevelElement.setAttribute('anxiety-num', 'medium')
    } else if (newLevel < 80) {
        anxietyLevelElement.setAttribute('anxiety-num', 'high')
    } else if (newLevel < 100) {
        anxietyLevelElement.setAttribute('anxiety-num', 'destructive')
    } else if (newLevel >= 100) {
        gameOver();
    }
}

// Function that changes the Time Limit and has a game over function
function updateTimeLimit(timeLoss) {
    var hoursLeftElement = document.getElementById('hours-left');
    var minutesLeftElement = document.getElementById('minutes-left');
    var hoursLeft = parseInt(hoursLeftElement.innerText);
    var minutesLeft = parseInt(minutesLeftElement.innerText);

    // Combining hours and minutes into a total amount of minutes
    var totalMinutesLeft = hoursLeft * 60 + minutesLeft;

    // If the time loss can be subtracted it is, otherwise the game is over
    if (totalMinutesLeft > timeLoss) {
        totalMinutesLeft -= timeLoss;
        // Separate hours and minutes
        hoursLeft = Math.floor(totalMinutesLeft / 60);
        minutesLeft = totalMinutesLeft % 60;
        // Reassign new time values to their perspective elements
        hoursLeftElement.innerText = hoursLeft;
        if(minutesLeft < 10){
            // Need this because without it 7:05 becomes 7:5 and 8:00 is 8:0
            minutesLeftElement.innerText = '0' + minutesLeft;
        } else {
            minutesLeftElement.innerText = minutesLeft;
        }
    } else {
        gameOver();
    }
}
// Function that adds the new output to the beginning of the output area
// Adding at the beginning avoids CSS problem with scrollbar
function updateOutput(outputText) {
    const currentOutput = document.getElementById('output');
    const newParagraph = document.createElement('p');
    newParagraph.textContent = outputText;

    currentOutput.insertBefore(newParagraph, output.firstChild);
}

// Option variables
const currentOption1 = document.getElementById('input-button-1');
const currentOption2 = document.getElementById('input-button-2');
const currentOption3 = document.getElementById('input-button-3');

// Functions to update the Options and Option Values
function updateOptions(optionText1, optionText2, optionText3) {
    currentOption1.textContent = optionText1;
    currentOption2.textContent = optionText2;
    currentOption3.textContent = optionText3;
}

function updateOptionValues(optionValues1, optionValues2, optionValues3, optionValues4) {
    currentOption1.setAttribute('anxiety-choice', optionValues1);
    currentOption2.setAttribute('time-choice', optionValues2);
    currentOption3.setAttribute('anxiety-choice', optionValues3);
    currentOption3.setAttribute('time-choice', optionValues4);
}

// Making the buttons functional by adding event listeners that cause something to happen
// Creating a variable for each button
const button1 = document.getElementById('input-button-1');
const button2 = document.getElementById('input-button-2');
const button3 = document.getElementById('input-button-3');
// Let the whole page be loaded first
document.addEventListener('DOMContentLoaded', function() {


    button1.addEventListener('click', function() {
        updateAnxietyLevel(parseInt(button1.getAttribute('anxiety-choice')));
        runNextEncounter();
    });
    button2.addEventListener('click', function() {
        updateTimeLimit(parseInt(button2.getAttribute('time-choice')));
        runNextEncounter();
    });
    button3.addEventListener('click', function() {
        updateAnxietyLevel(parseInt(button3.getAttribute('anxiety-choice')));
        updateTimeLimit(parseInt(button3.getAttribute('time-choice')));
        runNextEncounter();
    })
});

// Create an array to reference the encounters by name and give a number of encounters by checking the array length
const encounters = [];

// Create a constructor function for encounters to easily distribute the values
function Encounter(name, output, newOptions, newOptionValues) {
    this.name = name;
    this.output = output;
    this.newOptions = newOptions;
    this.newOptionValues = newOptionValues;
    encounters.push(this.name);
}

// Setting the current encounter position to 0 for the start of game
let currentEncounterPosition = 0;

function runNextEncounter() {
    // Check for any more encounters
    if (currentEncounterPosition < encounters.length) {
        // If so, set the encounter to the next in line
        const currentEncounter = encounters[currentEncounterPosition];

        // Update necessary elements
        updateOutput(currentEncounter.output);
        updateTimeLimit(20);
        updateOptions(currentEncounter.newOptions[0], currentEncounter.newOptions[1], currentEncounter.newOptions[2]);
        updateOptionValues(currentEncounter.newOptionValues[0], currentEncounter.newOptionValues[1], currentEncounter.newOptionValues[2[0]], currentEncounter.newOptionValues[2[1]])

        // Move variable to next array
        currentEncounterPosition++;
    } else {
        // If there are no more encounters than you win the game
        youWin();
    }
}


// Encounters
const firstEncounter = new Encounter(
    // Encounter Name
    "Leaving the apartment",
    // New Output
    "Welcome to Modern Adventure! Your goal is simple enough, gather your 3 groups of items as quickly and with as little anxiety as possible. First you need to pick up a board game for you and your friends to play, then you need to pick up a few decorations, and finally grab some snacks. Are you ready?",
    // New Options
    ["Head right out the door! Quick start but you'll be anxious you forgot something all day. (+10 Anxiety)",
    "Spend some time to make sure you have everything and looking for anything you forgot. (-20 minutes)",
    "On your way out, call your friend that always calms you down but also never stops talking. (-5 Anxiety, -45 minutes)"],
    // New Option Values
    [10, 20, [-5, 45]]
)

const secondEncounter = new Encounter(
    // Encounter Name
    "Troublesome Child",
    // New Output
    "You head out of your apartment towards the elevator and are thrilled to see it's empty. You step inside and press the lobby button and wait patiently as the doors begin to close. That's when a hand juts in and stops the doors from closing and an obviously tired man steps in flanked by an even more obviously hyper child who immediately presses all of the elevator buttons. What do you do?",
    // New Options
    ["Speak up and say something about how it has affected you. (+10 Anxiety, The Parent apologizes and fixes the buttons.'They've dealt with this before)",
    "Wait quietly and enjoy the ride I guess. (-30 minutes)",
    "If you run out now you can make the stairs, that'll be quicker. Just don't trip or anything! (+5 Anxiety, -15 minutes)"],
    // New Option Values
    [10, 30, [5, 15]]
)


