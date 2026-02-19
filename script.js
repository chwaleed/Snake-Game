const game = document.querySelector("#game");
const scoreIn = document.querySelector("#score");
let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
const speed = 10;
let snake = [{ x: 16, y: 10 }];
let food = { x: 5, y: 4 };
let score = 0;

function main(ctime) {
  requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

window.requestAnimationFrame(main);

function snakeCollide() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  return snake[0].x > 18 || snake[0].x <= 0 || snake[0].y > 18 || snake[0].y <= 0;
}

function gameEngine() {
  game.innerHTML = "";

  if (snakeCollide()) {
    inputDir = { x: 0, y: 0 };
    alert("Game Over! Press any arrow key to start again.");
    snake = [{ x: 16, y: 10 }];
    score = 0;
    scoreIn.textContent = score;
  }

  if (snake[0].y === food.y && snake[0].x === food.x) {
    snake.unshift({ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y });
    score += 10;
    scoreIn.textContent = score;
    const min = 2;
    const max = 16;
    food = {
      x: Math.round(min + (max - min) * Math.random()),
      y: Math.round(min + (max - min) * Math.random()),
    };
  }

  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }

  snake[0].x += inputDir.x;
  snake[0].y += inputDir.y;

  snake.forEach((segment, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add(index === 0 ? "snake-head" : "snake-body");
    game.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.id = "food";
  game.appendChild(foodElement);
}

window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") {
    inputDir.x = 0;
    inputDir.y = -1;
  } else if (e.key === "ArrowDown") {
    inputDir.x = 0;
    inputDir.y = 1;
  } else if (e.key === "ArrowRight") {
    inputDir.x = 1;
    inputDir.y = 0;
  } else if (e.key === "ArrowLeft") {
    inputDir.x = -1;
    inputDir.y = 0;
  }
});
