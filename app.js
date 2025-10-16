let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
  playSound(btn.id);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
  playSound(btn.id);
}

function playSound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randcolor = btns[randIdx];
  let randBtn = document.querySelector(`.${randcolor}`);
  gameseq.push(randcolor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 150);
    gameOverAnimation();
    reset();
  }
}

function gameOverAnimation() {
  document.body.classList.add("game-over");
  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 400);
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userseq.push(userColor);
  checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});