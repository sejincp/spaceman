/*----- constants -----*/
const ltr = [
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
const answer = {
  easy: ['star', 'wave', 'moon'],
  medium: ['journey', 'pyramid', 'mystery', 'station'],
  hard: ['laboratory', 'electricity', 'astronauts', 'microscope'],
};
// const maxGuesses = {
//   easy: 7,
//   medium: 6,
//   hard: 4
// };

/*----- state variables -----*/
let hiddenWord;
let displayWord;
let correctGuesses;
let incorrectGuesses;
let maxGuesses;
let win;
let lose;
// let timer;
// let difficulty;

/*----- cached elements  -----*/
const imgEl = document.querySelector('img');
const filmstripEl = document.getElementById('spaceman-filmstrip');
const btnEls = [...document.getElementsByClassName('ltr-button')];

/*----- event listeners -----*/
document
  .getElementById('ltr-buttons')
  .addEventListener('click', handleBtnClick);

/*----- functions -----*/
init();

function init() {
  correctGuesses = 0;
  incorrectGuesses = 0;
  win = false;
  curFrame = 'logo';
  render();
}

function render() {
  imgEl.src = `images/spaceman-${curFrame}.png`;
  filmstripEl.style.backgroundPosition = `-${SPRITE_WIDTH * (6 - curFrame)}px`;
  btnEls.forEach(function (btn) {
    btn.disabled = false;
    btn.style.backgroundColor = 'white';
  });
  btnEls[curFrame].disabled = true;
  btnEls[curFrame].style.backgroundColor = 'palegreen';
}

function handleBtnClick(event) {
  const btn = event.target;
  if (!btnEls.includes(btn)) return;
  curFrame = parseInt(btn.textContent);
  render();
}
