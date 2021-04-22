'use strict';

//selecting elements
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

let scores,currentScore,activePlayer,playing;

init();

rollBtn.addEventListener('click', function () {
    if (playing) {
        //generate random number 1-6
        const diceVal = Math.trunc(Math.random() * 6) + 1;

        dice.classList.remove('hidden');

        dice.src = `dice-${diceVal}.png`;

        if (diceVal !== 1) {
            //add to the current score
            currentScore += diceVal;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //switch player
            switchPlayer();
        }
    }
});

holdBtn.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //check who has won the game

        if (scores[activePlayer] >= 20) {
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

newBtn.addEventListener('click', init);

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

function init() {
    dice.classList.add('hidden');
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    //remove dark backgroun
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');

    //set all scores to 0
    score1.textContent = 0;
    score2.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;

    player1.classList.add('player--active');
}