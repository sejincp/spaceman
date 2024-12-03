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
const btnEls = [...document.getElementsByClassName('ltr-button')];
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
  wordDisplayEl = 'Start';
  hiddenWord = getRandomWord;
  displayWord = Array(hiddenWord.length).fill('_');
  guesses = [];
  correctGuesses = [];
  incorrectGuesses = [];
  btnEls.forEach((btn) => {
    btn.disabled = false;
  });
  curFrame = 0;
  render();
}

function render() {
  imgEl.src = `images/spaceman-${curFrame}.png`; // spaceman pic
  // reset the state of all buttons
  btnEls.forEach(function (btn) {
    btn.disabled = false;
  });
  btnEls[curFrame].disabled = true;
}

// get random word for answer
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// get the random word split
function getRandomWordSplit() {
  const randomWord = getRandomWord();
  const splitWord = randomWord.split('');
  return splitWord;
}

function handleBtnClick(event) {
  const btn = event.target;
  if (!btnEls.includes(btn)) return;
  curFrame = parseInt(btn.textContent);
  const guesses = btnEls.textContent;
  if (!btnEls.includes(btn)) {
    return guesses.push(splitWord);
  } else {
    return incorrectGuesses.push(guesses);
  }
}

function gameOver() {
  if (curFrame > 6) {
    message = 'Game Over';
  } else if ((guesses = correctGuesses)) {
    messge = 'Good luck';
  }
}
