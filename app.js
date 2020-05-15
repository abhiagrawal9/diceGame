/*
# GAME RULES
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes.Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost.After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.After that,
  it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game.
*/

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+dice+'</em>';
// var value = document.querySelector('#score-0').textContent; // getter
"use strict";
let scores, roundScore, activePlayer;
scores = [0, 0];
roundScore = 0;
activePlayer = 0; // 0 : FirstPlayer , 1 : SecondPlayer

document.querySelector('.dice').style.display = 'none'; // setting the css property
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;


document.querySelector('.btn-roll').addEventListener('click', function () {
    // generate random number
    let dice = Math.floor(Math.random() * 6 + 1);

    // display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block'; 
    diceDOM.src = `dice-${dice}.png`;

    // Update the round score if rolled number was not 1
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore; // setter
    } else {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById(`current-0`).textContent = 0;
        document.getElementById(`current-1`).textContent = 0;

        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');

        // Toggle between active player screens 
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        //hiding the dice one active player changed
        document.querySelector('.dice').style.display = 'none';
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    // add current round scroe to global scroe
    // update the UI
    // check if player won the game

});