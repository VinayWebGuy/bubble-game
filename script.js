$('.mode-heading').on('click', function () {
    let mode = $(this).attr('mode-id');
    $(`#${mode}`).toggleClass("collapse");
});


// Game Logic

// Initialize Variables
let timer = 0;
let score = 0;
let selectedMode = -1;
let mode = "";
let hitNumber = 0;
let clickedValue = 0;
let modes = ["easy", "medium", "hard", "extreme", "god"];
let modeRules = [
    { time: 90, correctScore: 10, incorrectScore: 5, correctTime: 1, incorrectTime: 1, maxValue: 10 },
    { time: 75, correctScore: 15, incorrectScore: 10, correctTime: 2, incorrectTime: 2, maxValue: 15 },
    { time: 60, correctScore: 20, incorrectScore: 12, correctTime: 4, incorrectTime: 3, maxValue: 20 },
    { time: 45, correctScore: 30, incorrectScore: 15, correctTime: 5, incorrectTime: 4, maxValue: 30 },
    { time: 30, correctScore: 40, incorrectScore: 25, correctTime: 7, incorrectTime: 5, maxValue: 40 },
];

// Start Game
$('#start').on('click', function () {
    $('#instruction').addClass('hide');
    $('#game').removeClass('hide');
    mode = $('#select-mode').val();
    selectedMode = modes.indexOf(mode);
    timer = modeRules[selectedMode].time;
    initializeGame();
    console.log(selectedMode);
});

function initializeGame() {
    $('.game-body').on('click', '.bubble', function () {
        clickedValue = $(this).html();
        checkResults(clickedValue);
    });
    renderBubbles();
    renderHit();
    renderScore(score);
    setTimer();

}

function randomNumberForBubble() {
    let rand = Math.floor(Math.random() * modeRules[selectedMode].maxValue) + 1;
    return rand;
}

function randomNumberForHit() {
    let rand = Math.floor(Math.random() * modeRules[selectedMode].maxValue) + 1;
    return rand;
}

function renderBubbles() {
    let bubbles = "";
    for (let i = 0; i < 280; i++) {
        bubbles += `<span class="bubble">${randomNumberForBubble()}</span>`;
    }
    $('.game-body').html(bubbles);
}

function renderHit() {
    hitNumber = randomNumberForHit();
    $('#hit').html(hitNumber);
}

function checkResults(clickedValue) {
    console.log(modeRules[selectedMode].correctScore);
    if (clickedValue == hitNumber) {
        score += modeRules[selectedMode].correctScore;
        timer += modeRules[selectedMode].correctTime;
        

    }
    else {
        score -= modeRules[selectedMode].incorrectScore;
        timer -= modeRules[selectedMode].incorrectTime;
    }
    renderBubbles();
    renderHit();
    renderScore(score);
}
function renderScore() {
    $('#score').html(score);
}
function setTimer(){
    let timerInt = setInterval(() => {
        if(timer >= 0){
            $('#timer').html(timer);
            timer--;
        } else {
            clearInterval(timerInt);
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    $('#game').addClass('hide');
    $('#score-result').html(score);
    $('#mode-result').html(`(${mode.toUpperCase()})`);
    $('#result').removeClass('hide');
}



