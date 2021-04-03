const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let hole;
let lastHole;
let timeUp = false;
let score = 0;

function randTime(min, max) {
  return (Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  hole = holes[idx];
  if (lastHole === hole) {
    console.log(`Tidak boleh sama dua kali ya Bund`);
    return randomHole(holes);
  }


  lastHole = hole;
  return hole;
};

function show() {
  const time = randTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add(`up`);
  setTimeout(() => {
    hole.classList.remove(`up`);
    if (!timeUp) show();
  }, time);
};

function startGame() {
  scoreBoard.innerHTML = 0;
  timeUp = false;
  score = 0;
  show();
  setTimeout(() => {
    timeUp = true;
  }, 10000);
};

function clickDown(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove(`up`);
  scoreBoard.innerHTML = score;
};

moles.forEach(mole=>mole.addEventListener(`click`, clickDown))