
/*
Changeing these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

"use strict";

let scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // generate random number
        let dice = Math.floor(Math.random() * 6 + 1);

        // display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `./images/dice-${dice}.png`;

        // Update the round score if rolled number was not 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; // setter
        } else {
            // change active player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add current round scroe to global scroe
        scores[activePlayer] += roundScore;

        // update the UI
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        // check if player won the game
        let target = document.getElementById('target').value;
        let winningScore;
        target ? winningScore = target : winningScore = 100;
        // if (target) {
        //     winningScore = target;
        // } else {
        //     winningScore = 100;

        // }
        if (scores[activePlayer] >= winningScore) {
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!!'
            document.querySelector('.dice').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            // change active player 
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // 0 : FirstPlayer , 1 : SecondPlayer
    gamePlaying = true;
    document.getElementById('target').value = '';
    document.querySelector('.dice').style.display = 'none'; // setting the css property
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // change current scores to 0 in UI
    document.getElementById(`current-0`).textContent = 0;
    document.getElementById(`current-1`).textContent = 0;

    // Toggle between active player screens 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // hide the dice
    document.querySelector('.dice').style.display = 'none';
}

