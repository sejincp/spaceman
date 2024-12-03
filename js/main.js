/*----- constants -----*/
const ltrs = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const words = ['star', 'wave', 'moon'];

// const words = {
//   easy: ['star', 'wave', 'moon'],
//   medium: ['journey', 'pyramid', 'mystery', 'station'],
//   hard: ['laboratory', 'electricity', 'astronauts', 'microscope'],
// };

// const maxGuesses = {
//   easy: 7,
//   medium: 6,
//   hard: 4
// };

/*----- state variables -----*/
let hiddenWord = []; // words to guess
let displayWord = []; // _ _ _ _
let guesses = [];
let correctGuesses = [];
let incorrectGuesses = [];
let curFrame = 0;
let gameMessage = '';
// let maxGuesses;
// let timer;

/*----- cached elements  -----*/
const imgEl = document.getElementById('spaceman-img');
const btnEls = [...document.getElementsByClassName('btn')];
const messageEl = document.getElementById('game-message');
let wordDisplayEl = document.getElementById('word-display');

/*----- event listeners -----*/
document
  .getElementById('ltr-buttons')
  .addEventListener('click', handleBtnClick);
document.getElementById('reset').addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  gameMessage = 'Start!';
  hiddenWord = getRandomWord();
  displayWord = Array(hiddenWord.length).fill('_');
  guesses = [];
  correctGuesses = hiddenWord.split('');
  incorrectGuesses = [];
  btnEls.forEach((btn) => {
    btn.disabled = false;
  });
  curFrame = 0;
  render();
}

function render() {
  imgEl.src = `images/spaceman-${curFrame}.png`; // spaceman pic
  wordDisplayEl.textContent = displayWord.join('');
  messageEl.textContent = gameMessage;
  btnEls.forEach(function (btn) {
    const ltr = btn.textContent.toLowerCase();
    btn.disabled = guesses.includes(ltr);
  });
}

// get random word for answer
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// get the random word split
function getRandomWordSplit() {
  const randomWord = getRandomWord();
  const splitWord = randomWord.split('');
  correctGuesses.push(splitWord);
}

function handleBtnClick(event) {
  const btn = event.target;
  if (!btn.classList.contains('btn')) return; // ensure that a button was clicked

  const ltrGuess = btn.textContent.toLowerCase();
  if (!guesses.includes(ltrGuess)) {
    guesses.push(ltrGuess);
    console.log('Guesses before push', guesses); // add a guessed letter
  }

  if (correctGuesses.includes(ltrGuess)) {
    gameMessage = 'Correct';
    correctGuesses.forEach((ltr, idx) => {
      if (ltr === ltrGuess) displayWord[idx] = ltr;
    });
  } else {
    gameMessage = 'Incorrect';
    incorrectGuesses.push(ltrGuess);
    curFrame++;
  }
  render();
}

function gameOver() {
}
