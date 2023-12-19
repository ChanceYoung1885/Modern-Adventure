
localStorage.setItem('beginning screen', document.getElementById('full-screen').innerHTML);
// Game over function
function gameOver() {
    const clearTheScreen = document.getElementById('full-screen');
    clearTheScreen.innerHTML = 
    "<div id='game-over'> <h1>Mass Text: </h1><h2>Sorry guys, I had an emergency come up and have to cancel tonight. Rain check?</h2><button id='restart-button'>Try again?</button><div><script src='script.js' defer></script>";
}

// Game win function
function youWin() {
    const endGameStats = document.getElementById('user-stats').innerHTML;
    const clearTheScreen = document.getElementById('full-screen');
    clearTheScreen.innerHTML = 
    "<div id='game-over'> <h1>How it went: </h1><h2>Turns out you were worried for nothing. Everyone had a great time and they can't wait until you host again, but you can. Haha...</h2><button id='restart-button'>Try again?</button><div>" + endGameStats + "<script src='script.js' defer></script>";
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', function() {
        startOver();
    })
}

// Setting the screen to the beginning
function startOver() {
    const resetScreen = document.getElementById('full-screen');
    resetScreen.innerHTML = localStorage.getItem('beginning screen');
}

// Now have it run when you click try again

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
function updateOptions(optionText) {
    currentOption1.textContent = optionText[0];
    currentOption2.textContent = optionText[1];
    currentOption3.textContent = optionText[2];
}

function updateOptionValues(optionValues) {
    currentOption1.setAttribute('anxiety-choice', optionValues[0]);
    currentOption2.setAttribute('time-choice', optionValues[1]);
    currentOption3.setAttribute('anxiety-choice', optionValues[2][0]);
    currentOption3.setAttribute('time-choice', optionValues[2][1]);
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
    encounters.push(this);
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
        updateOptions(currentEncounter.newOptions);
        updateOptionValues(currentEncounter.newOptionValues)

        // Move variable to next array
        currentEncounterPosition++;
    } else {
        // If there are no more encounters than you win the game
        youWin();
        currentEncounterPosition = 0
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

const thirdEncounter = new Encounter(
    // Encounter Name
    "A 'Helpful' Friend",
    // New Output
    "As you enter the parking lot of your apartment complex you run into a friend that lives in your building. After a small conversation about your day they offer to help set things up while you are out to save you the headache of doing it when you get back.",
    // New Options
    ["Sure, they have their own style so you know it's not gonna be how you want but at least it'll get done quicker. (+ 10 Anxiety)", 
    "Politely decline and remind yourself you'll have to get home a little sooner. (- 30 minutes)", 
    "Accept their help but remind them it's your place anf your party so it should look how you want it to. (+ 10 Anxiety, + 15 minutes)"],
    // New Option Values
    [10, 30, [10, -15]]
)

const fourthEncounter = new Encounter(
    // Encounter Name
    "I believe I know the way",
    // New Output
    "You get in your car, load up your maps, and see that there's traffic on the way to the mall. From what you remember there's a quicker way to go that almost never has traffic, and if you head that way you'll get there in the time you expected in the beginning.",
    // New Options
    ["You're pretty confident the route you know is quicker but that doesn't mean that you won't be worried the entire time that you're wrong. (+ 10 Anxiety)", 
    "You feel a lot safer just going off of what the internet says since it has so much info. There can't be a quicker way can there? (- 45 minutes)", 
    "There's nothing wrong with trying something out and changing if it doesn't work. You can head your way and change direction if it seems too slow. (+5 Anxiety, -20 minutes)"],
    // New Option Values
    [10, 45, [5, 20]]
)

const fifthEncounter = new Encounter(
    // Encounter Name
    "That is not Parallel",
    // New Output
    "You arrive at the mall and the parking lot is a sea of colored metal. As you pull in you immediately find a parking space but you need to parallel park to get in and you don't really remember exactly how to do it. How much longer will it take to find a spot.",
    // New Options
    ["You remember enough about how to do it as long as you put all your focus into it and try not to panic. (+ 10 Anxiety)",
    "You're better off looking for another spot. There're so many people coming and going that spots have to be all around. It can't take that long right? (- 20 minutes)",
    "You can do it, you got this. Just take a few minutes to psych yourself up even though it's making you anxious just thinking about parallel... oh look a spot opened up. (+ 5 Anxiety, - 5 minutes)"],
    // New Option Values
    [10, 20, [5, 5]]
)

const sixthEncounter = new Encounter(
    // Encounter Name
    "You don't have any in the back?",
    // New Output
    "Thank god you got the parking over with, but that doesn't mean that the problems are done with. You got your decorations but when you were looking for snacks, it seems like the appetizer plate your friends love isn't on the shelf at the first store you went to. You know they have them on the other side of the mall but that'll add so much time.",
    // New Options
    ["I'll just grab the next best thing and I'm sure no one will notice the difference. I'll just feel like I'm lying to everyone. (+ 10 Anxiety)",
    "If I run now I can get it and grab the board game from a store over there and it shouldn't add too much time. (- 30 minutes)",
    "If I ask an employee they might have some in the back or somewhere else in the store, just gotta build the courage. (+ 5 Anxiety, - 15 minutes)"],
    // New Option Values
    [10, 30, [5, 15]]
)

const seventhEncounter = new Encounter(
    // Encounter Name
    "That'll teach you a lesson",
    // New Output
    "As you grab the snack and get ready to go pay, a familiar face comes around the corner, and for the first time in years you are face to face with your kindergarten teacher.",
    // New Options
    ["I don't want to be rude but I don't have the time. I have to excuse myself before they start talking! (+ 15 Anxiety)",
    "I have to be nice and just listen to what they have to say and then make my way towards the exit. They can't have that much to talk about right? (- 30 minutes)",
    "All I have to do is come up with a good enough reason to move along. I could just be honest if I don't come up with anything quick too. (+ 5 Anxiety, - 10 minutes"],
    // New Option Values
    [15, 30, [ 5, 10]]
)

const eighthEncounter = new Encounter(
    // Encounter Name
    "This must be where everyone went",
    // New Output
    "After talking to your old teacher you head to the checkout and see that all of the lines are way to long and it's just going to add more time to your trip.",
    // New Options
    ["I could do self checkout. There's almost no one over there but I know that some worker is gonna be watching me the entire time and that just sucks. (+ 10 Anxiety)",
    "I think I'll just stay in the closest line since they all look about the same length. Long lines are a valid excuse right? (- 20 minutes)",
    "If I asked the worker to show me how the self checkout worked I would feel less like they think I'm stealing things, but it might take some extra time. (+ 5 Anxiety, - 10 minutes)"],
    // New Option Values
    [10, 20, [5, 10]]
)

const ninthEncounter = new Encounter(
    // Encounter Name
    "Can't make everyone happy.",
    // New Output
    "Now that you have your decorations and snacks, you just need to choose a board game for the night. Decisions are easy right?.. Right?",
    // New Options
    ["If I choose monopoly most people will be happy since they like it but I know it'll turn into an argument or something hilarious and I'm not sure I'm ready to know which. (+ 10 Anxiety)",
    "I'll just make a couple calls and send a few texts to make sure everyone agrees on what we should play. I should've done this sooner but at least it'll go well. (-30 minutes)",
    "Johan knows pretty much what everyone likes. I'll just send him a quick text and when he responds I'll get whatever he says. (+ 10 Anxiety, - 10 minutes)"],
    // New Option Values
    [10, 30, [10, 10]]
)

const tenthEncounter = new Encounter(
    // Encounter Name
    "Anything else. Please",
    // New Output
    "Heading back to your car you run into a familiar face that you rather would not've seen. You could've avoided them if they hadn't seen you first.",
    // New Options
    ["Say 'Hi' and let them know you would love to talk but you're in a rush to head home offer to exchange numbers if they seem like they are wanting to talk. (+ 15 Anxiety)",
    "Just because they saw you doesn't mean that you saw them. Act like you didn't and head back into the store and wander around a little until you know the coast is clear. (- 15 minutes)",
    "The nice thing would be to say hi and if a conversation happens it happens. You don't have to be thrilled, just stay calm a little. (+ 10 Anxiety, - 10 minutes)"],
    // New Option Values
    [15, 15, [10, 10]]
)