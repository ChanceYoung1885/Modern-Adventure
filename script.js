//Game over function
function gameOver() {
    const clearTheScreen = document.getElementById('full-screen');
    clearTheScreen.innerHTML = 
    "<div id='game-over'> <h1>Mass Text: </h1><h2>Sorry guys, I had an emergency come up and have to cancel tonight. Rain check?</h2><button id='restart-button'>Try again?</button><div>";
}

//Function that changes the Anxiety Level and the color of its text to better represent the urgency and has a game over function
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

//Function that changes the Time Limit and has a game over function
function updateTimeLimit(timeLoss) {
    var hoursLeftElement = document.getElementById('hours-left');
    var minutesLeftElement = document.getElementById('minutes-left');
    var hoursLeft = parseInt(hoursLeftElement.innerText);
    var minutesLeft = parseInt(minutesLeftElement.innerText);

    //Combining hours and minutes into a total amount of minutes
    var totalMinutesLeft = hoursLeft * 60 + minutesLeft;

    //If the time loss can be subtracted it is, otherwise the game is over
    if (totalMinutesLeft > timeLoss) {
        totalMinutesLeft -= timeLoss;
        //Separate hours and minutes
        hoursLeft = Math.floor(totalMinutesLeft / 60);
        minutesLeft = totalMinutesLeft % 60;
        //Reassign new time values to their perspective elements
        hoursLeftElement.innerText = hoursLeft;
        minutesLeftElement.innerText = minutesLeft;
    } else {
        gameOver();
    }
}
//Function that adds the new output to the beginning of the output area
//Adding at the beginning avoids CSS problem with scrollbar
function updateOutput(outputText) {
    const currentOutput = document.getElementById('output');
    const newParagraph = document.createElement('p');
    newParagraph.textContent = outputText;

    currentOutput.insertBefore(newParagraph, output.firstChild);
}

// Making the buttons functional by adding event listeners that cause something to happen
// Let the whole page be loaded first
document.addEventListener('DOMContentLoaded', function() {
    const button1 = document.getElementById('input-button-1');
    const button2 = document.getElementById('input-button-2');
    const button3 = document.getElementById('input-button-3');


    button1.addEventListener('click', function() {
        //Running option 1 select
        firstOptionSelected();
    });
    button2.addEventListener('click', function() {
        secondOptionSelected();
    });
    button3.addEventListener('click', function() {
        thirdOptionSelected();
    })
});

// Making the functions for each button
function firstOptionSelected() {
    //Adds to output with 
}
