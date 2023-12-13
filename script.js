//Game over function
function gameOver() {
    const clearTheScreen = document.getElementById('full-screen');
    clearTheScreen.innerHTML = 
    "<div id='game-over'> <h1>Mass Text: </h1><h2>Sorry guys, I had an emergency come up and have to cancel tonight. Rain check?</h2><div>";
}

//Function that changes the Anxiety Level and the color of its text to better represent the urgency and has a game over function
function updateAnxietyLevel(newLevel) {
    const anxietyLevelElement = document.getElementById('anxiety-level');
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
    var hoursLeft = parseInt(document.getElementById('hours-left').innerText);
    var minutesLeft = parseInt(document.getElementById('minutes-left').innerText);

    if (minutesLeft > timeLoss) {
        minutesLeft -= timeLoss
    } else if (hoursLeft > 0){
        hoursLeft -= 1;
        minutesLeft += 60;
        if (minutesLeft > timeLoss) {
            minutesLeft -= timeLoss
        } else if (hoursLeft > 0){
            hoursLeft -= 1;
            minutesLeft += 60;
            if (minutesLeft > timeLoss) {
                minutesLeft -= timeLoss
            } else {
                gameOver;
            }
        }
    } else {
        gameOver;
    }
}