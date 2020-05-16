"use strict";

let scores, roundScore, activePlayer, gamePlaying, previousRole;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // generate random number
        let dice1 = Math.floor(Math.random() * 6 + 1);
        let dice2 = Math.floor(Math.random() * 6 + 1);
       
        // display the result
        let dice1DOM = document.querySelector('#dice-1');
        let dice2DOM = document.querySelector('#dice-2');
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = `./images/dice-${dice1}.png`;
        dice2DOM.src = `./images/dice-${dice2}.png`;

        //A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
        // if (dice === 6 && previousRole === 6) {
        //     scores[activePlayer] = 0;
        //     document.getElementById(`score-${activePlayer}`).textContent = '0';
        //     nextPlayer();
        // }else if (dice !== 1) {
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore; // setter
        //     previousRole = dice;
        // } 
        // else {
        //     // change active player
        //     nextPlayer();
        // }
        
        if (!(dice1 ===1 || dice2 ===1)) {
            roundScore += (dice1 +dice2);
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
        
        if (scores[activePlayer] >= winningScore) {
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!!'
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            hideDices();
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
    hideDices();
    document.getElementById('target').value = '';
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
    previousRole = undefined;

    // change current scores to 0 in UI
    document.getElementById(`current-0`).textContent = 0;
    document.getElementById(`current-1`).textContent = 0;

    // Toggle between active player screens 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDices();
}

function hideDices() {
    // hide the dices
    document.getElementById('dice-1').style.display = 'none'; // setting the css property
    document.getElementById('dice-2').style.display = 'none';
}