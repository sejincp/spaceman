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

/*----- state variables -----*/
let hiddenWord = []; // words to guess
let displayWord = []; // _
let guesses = [];
let correctGuesses = [];
let incorrectGuesses = [];
let curFrame = 0;
let gameMessage = '';
let wordDifficulty = 'easy';
let gameOver = false;

/*---------- cached elements  ----------*/
const imgEl = document.getElementById('spaceman-img');
const btnEls = [...document.querySelectorAll('#ltr-buttons .btn')];
const messageEl = document.getElementById('game-message');
let wordDisplayEl = document.getElementById('word-display');
let subWordDisplyEl = document.getElementById('sub-display');
let resetBtn = document.getElementById('reset');
let tryAgain = document.getElementById('try-again');
let soundImg = document.querySelector('#sound');

/*---------- event listeners ----------*/
document
  .getElementById('ltr-buttons')
  .addEventListener('click', handleBtnClick);
document.getElementById('reset').addEventListener('click', init);
document.getElementById('try-again').addEventListener('click', init);
document.getElementById('home-menu').addEventListener('click', refreshPage);
document
  .querySelectorAll('.level-btn')
  .forEach((btn) => btn.addEventListener('click', selectWordDifficulty));
document.getElementById('how-to-play-btn').addEventListener('click', howTo);
document.getElementById('how-to-close').addEventListener('click', howToclose);
soundImg.addEventListener('click', soundControl);

/*---------- functions ----------*/
init();

function init() {
  hiddenWord = getRandomWord();
  displayWord = Array(hiddenWord.length).fill('_');
  guesses = [];
  correctGuesses = hiddenWord.split('');
  incorrectGuesses = [];
  gameMessage = 'START!';
  curFrame = 0;
  gameOver = false;
  tryAgain.style.display = 'none';
  btnEls.forEach((btn) => {
    btn.classList = 'btn';
    btn.classList.remove('disabled');
  });
  resetBtn.style.display = 'flex';
  subWordDisplyEl.textContent = '';
  messageEl.style.color = '#333';

  render();
}

function render() {
  imgEl.src = `assets/images/spaceman-${curFrame}.png`;
  wordDisplayEl.textContent = displayWord.join('');
  messageEl.textContent = gameMessage;
  btnEls.forEach((btn) => {
    const ltr = btn.textContent.toLowerCase();
    if (gameOver) {
      btn.disabled = true;
      btn.classList.add('disabled');
    } else {
      btn.disabled = guesses.includes(ltr);
      btn.classList.remove('disabled');
    }
  });
}

function getRandomWord() {
  const wordList = words[wordDifficulty];
  return wordList[Math.floor(Math.random() * wordList.length)];
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
    correctSound.volume = 0.3;
    correctSound.play();
  } else {
    gameMessage = 'Try another one 🤔';
    btn.classList.add('incorrect-guess');
    incorrectGuesses.push(ltrGuess);
    incorrectSound.volume = 0.3;
    incorrectSound.play();
    curFrame++;
  }

  if (curFrame > 6) {
    gameOver = true;
    messageEl.style.color = 'red';
    tryAgain.style.display = 'flex';
    resetBtn.style.display = 'none';
    gameMessage = 'Game Over 😔';
    subWordDisplyEl.textContent = 'The answer was..';
    displayWord = hiddenWord.split('');
    gameLoseSound.volume = 0.3;
    gameLoseSound.play();
  } else if (displayWord.join('') === hiddenWord) {
    gameOver = true;
    messageEl.style.color = 'blue';
    tryAgain.style.display = 'flex';
    resetBtn.style.display = 'none';
    gameMessage = 'You Win 😎';
    gameWinSound.volume = 0.3;
    gameWinSound.play();
  }
  render();
}

function selectWordDifficulty(event) {
  if (!event.target.classList.contains('level-btn')) return;
  wordDifficulty = event.target.getAttribute('data-difficulty');
  document.getElementById('landing').style.display = 'none';
  startSound.volume = 0.3;
  startSound.play();
  init();
}

function refreshPage() {
  location.reload();
  bgmSound.loop = true;
  bgmSound.play();
}

function howTo() {
  document.getElementById('how-to').style.display = 'flex';
}

function howToclose() {
  document.getElementById('how-to').style.display = 'none';
}

function soundControl() {
  if (!bgmSound.paused) {
    bgmSound.pause();
    soundImg.classList = 'sound-off';
    soundImg.src = './assets/images/ico-volume-off.png';
  } else {
    bgmSound.loop = true;
    bgmSound.play();
    soundImg.classList = 'sound-on';
    soundImg.src = './assets/images/ico-volume-on.png';
  }
}
