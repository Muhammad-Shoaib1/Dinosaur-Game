let score = 0;
let cross = true;
let dino = document.querySelector(".dino");
let obstacle = document.querySelector(".obstacle");
let gameOver = document.querySelector(".EndOverlay");
let retryButtons = document.querySelectorAll(".retryButton");
let counter = document.querySelector(".scoreCounter");
counter.innerHTML = `Your Score : ${score}`;

let finalScore = document.querySelector(".ResultScore");

document.onkeydown = function (e) {
  console.log(e.keyCode);
  if (e.keyCode === 13) {
    obstacle.classList.add("obstacleAni");
  } else if (e.keyCode === 27) {
    obstacle.classList.remove("obstacleAni");
  } else if (e.keyCode === 32) {
    dino.classList.add("dinoAnimation");
    setTimeout(() => {
      dino.classList.remove("dinoAnimation");
    }, 650);
  } else if (e.keyCode === 39) {
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    dino.style.left = dinoX + 112 + "px";
  } else if (e.keyCode === 37) {
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    dino.style.left = (dinoX - 112) + "px";
  }
}

setInterval(() => {
  let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
  let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

  let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
  let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"));

  let offSetX = Math.abs(dx - ox);
  let offSetY = Math.abs(dy - oy);


  if (offSetX < 63 && offSetY < 42) {
    obstacle.classList.remove("obstacleAni");
    gameOver.classList.add("gameOverOverlay");
    finalScore.innerHTML = `You Scored: ${score}`;
    cross = false;
  }
  else if (offSetX < 73 && cross) {
    score += 1;
    cross = false;
    updateScore(score);
    setTimeout(() => {
      cross = true;
      let aniDur = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
      let newDur = aniDur > 3 ? aniDur - 0.01 : 3;
      obstacle.style.animationDuration = newDur + 's';
    }, 1000);
  }
}, 10);

function updateScore(score) {
  counter.innerHTML = `Your Score : ${score}`;
}
retryButtons.forEach(button => {
  button.addEventListener("click", function () {
    location.reload();
  });
});
document.querySelector(".jumpButton").addEventListener("click", function () {
  if (!dino.classList.contains("dinoAnimation")) {
    dino.classList.add("dinoAnimation");
    setTimeout(() => {
      dino.classList.remove("dinoAnimation");
    }, 1000);
  }
});

document.querySelector(".moveLeftButton").addEventListener("click", function () {
  let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  dino.style.left = (dx - 20) + "px";
});

document.querySelector(".moveRightButton").addEventListener("click", function () {
  let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  dino.style.left = dx + 20 + "px";
});
