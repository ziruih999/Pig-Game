'use strict';

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnHelp = document.querySelector('.btn--help');
const helpPage = document.querySelector('.help');
const btnClose = document.querySelector('.close-help');
const overlay = document.querySelector('.overlay');

const currentsDOM = [
  document.querySelector('#current--0'),
  document.querySelector('#current--1'),
];
const panelsDOM = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];
const scoresDOM = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];
const scores = [0, 0];
const currents = [0, 0];

let player = 0;

function rollDice() {
  const num = Math.trunc(Math.random() * 6) + 1;
  displayDice(num);
  if (num === 1) {
    scores[player] = 0;
    scoresDOM[player].textContent = 0;
    switchPlayer();
  } else {
    currents[player] += num;
    currentsDOM[player].textContent = currents[player];
  }
}

function hold() {
  scores[player] += currents[player];
  scoresDOM[player].textContent = scores[player];
  if (scores[player] >= 20) {
    alert(`PLAYER ${player} WINS!`);
    newGame();
  } else {
    switchPlayer();
  }
}

function displayDice(num) {
  dice.src = `dice-${num}.png`;
}

function switchPlayer() {
  // Reset current score
  currentsDOM.map(function (element) {
    element.textContent = 0;
  });
  currents[0] = currents[1] = 0;
  // Toggle panel background
  panelsDOM.map(function (element) {
    element.classList.toggle('player--active');
  });
  player = (player + 1) % 2;
}

function newGame() {
  for (let i = 0; i < 2; i++) {
    player = 0;
    currents[i] = 0;
    scores[i] = 0;
    scoresDOM[i].textContent = 0;
    currentsDOM[i].textContent = 0;
    if (i === 0) {
      panelsDOM[i].classList.add('player--active');
    } else {
      panelsDOM[i].classList.remove('player--active');
    }
  }
}

function showHelp() {
  helpPage.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeHelp() {
  helpPage.classList.add('hidden');
  overlay.classList.add('hidden');
}

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', newGame);
btnHelp.addEventListener('click', showHelp);
btnClose.addEventListener('click', closeHelp);

newGame();
