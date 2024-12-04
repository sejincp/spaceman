/*---------- constants ----------*/
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

const words = {
  easy: ['star', 'wave', 'moon', 'mars'],
  medium: ['journey', 'pyramid', 'mystery', 'station'],
  hard: ['laboratory', 'electricity', 'astronauts', 'microscope'],
};

// sounds
const bgmSound = new Audio('./assets/sounds/starlight-204347.mp3');
const startSound = new Audio('./assets/sounds/start.wav');
const btnSound = new Audio('./assets/sounds/click.wav');
const correctSound = new Audio('./assets/sounds/correct.wav');
const incorrectSound = new Audio('./assets/sounds/incorrect.wav');
const gameWinSound = new Audio('./assets/sounds/win.wav');
const gameLoseSound = new Audio('./assets/sounds/lose.wav');

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
let wordDifficulty = 'easy';
let gameOver = false;
// let maxGuesses;
// let timer;

/*---------- cached elements  ----------*/
const imgEl = document.getElementById('spaceman-img');
const btnEls = [...document.querySelectorAll('#ltr-buttons .btn')];
const messageEl = document.getElementById('game-message');
let wordDisplayEl = document.getElementById('word-display');
let soundImg = document.querySelector('#bgm');

/*---------- event listeners ----------*/
document
  .getElementById('ltr-buttons')
  .addEventListener('click', handleBtnClick);
document.getElementById('reset').addEventListener('click', init);
document
  .getElementById('select-difficulty')
  .addEventListener('click', refreshPage);
document
  .querySelectorAll('.level-btn')
  .forEach((btn) => btn.addEventListener('click', selectWordDifficulty));
soundImg.addEventListener('click', soundControl);

/*---------- functions ----------*/
init();

function init() {
  messageEl.style.color = '#333';
  gameMessage = 'START!';
  hiddenWord = getRandomWord();
  displayWord = Array(hiddenWord.length).fill('_');
  guesses = [];
  correctGuesses = hiddenWord.split('');
  incorrectGuesses = [];
  btnEls.forEach((btn) => {
    btn.classList = 'btn';
    btn.disabled = false;
  });
  curFrame = 0;
  render();
}

function render() {
  imgEl.src = `assets/images/spaceman-${curFrame}.png`; // spaceman pic
  wordDisplayEl.textContent = displayWord.join('');
  messageEl.textContent = gameMessage;
  btnEls.forEach(function (btn) {
    const ltr = btn.textContent.toLowerCase();
    btn.disabled = guesses.includes(ltr);
  });
}

function disableAllbtns() {
  btnEls.forEach((btn) => {
    btn.disabled = true;
    btn.classList.add('disabled');
  });
}

function getRandomWord() {
  const wordList = words[wordDifficulty];
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function getRandomWordSplit() {
  const randomWord = getRandomWord();
  const splitWord = randomWord.split('');
  correctGuesses.push(splitWord);
}

function handleBtnClick(event) {
  const btn = event.target;
  if (!btn.classList.contains('btn')) return;

  const ltrGuess = btn.textContent.toLowerCase();
  if (!guesses.includes(ltrGuess)) {
    guesses.push(ltrGuess);
    console.log('Guesses before push', guesses);
  }

  if (correctGuesses.includes(ltrGuess)) {
    gameMessage = 'Correct 👍';
    btn.classList.add('correct-guess');
    correctGuesses.forEach((ltr, idx) => {
      if (ltr === ltrGuess) displayWord[idx] = ltr;
    });
    correctSound.volume = 0.5;
    correctSound.play();
  } else {
    gameMessage = 'Try another one 🤔';
    btn.classList.add('incorrect-guess');
    incorrectGuesses.push(ltrGuess);
    incorrectSound.volume = 0.5;
    incorrectSound.play();
    curFrame++;
  }

  if (curFrame > 5) {
    messageEl.style.color = 'red';
    gameMessage = 'Game Over 😔';
    gameLoseSound.volume = 0.5;
    gameLoseSound.play();
  } else if (displayWord.join('') === hiddenWord) {
    messageEl.style.color = 'blue';
    gameMessage = 'You Win 😎';
    gameWinSound.volume = 0.5;
    gameWinSound.play();
  }
  render();
}

function selectWordDifficulty(event) {
  if (!event.target.classList.contains('level-btn')) return;
  wordDifficulty = event.target.getAttribute('data-difficulty');
  document.getElementById('landing').style.display = 'none';
  startSound.volume = 0.5;
  startSound.play();
  init();
}

function refreshPage() {
  location.reload();
  bgmSound.loop = true;
  bgmSound.play();
}

function soundControl() {
  if (!bgmSound.paused) {
    bgmSound.pause();
    soundImg.classList = 'bgm-off';
    soundImg.src = './assets/images/ico-volume-off.png';
  } else {
    bgmSound.loop = true;
    bgmSound.play();
    soundImg.classList = 'bgm-on';
    soundImg.src = './assets/images/ico-volume-on.png';
  }
}
