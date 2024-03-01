var game = document.querySelector("#game");
var scoreIn = document.querySelector("#score");
let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 10;
let snake = [{ x: 16, y: 10 }];
let food = { x: 5, y: 4 };
let score = 0;
let overCounter = false;

function main(ctime) {
  requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
window.requestAnimationFrame(main);

// Main Logic of Engin Start here
function gameEngine() {
  game.innerHTML = "";
  function snakeCollide() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }
    if (
      snake[0].x >= 18 ||
      snake[0].x <= 0 ||
      snake[0].y >= 18 ||
      snake[0].y <= 0
    ) {
      return true;
    }
  }
  // If Snake Collides
  if (snakeCollide(snake)) {
    inputDir = { x: 0, y: 0 };
    alert("Game Over Press Any Key to Start Agian!");
    snake = [{ x: 16, y: 10 }];
    // overCounter = false;
    score = 0;
    scoreIn.textContent = score;
  }

  // Eating Food and Updating Segment
  if (snake[0].y === food.y && snake[0].x === food.x) {
    snake.unshift({ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y });
    score = score + 10;
    scoreIn.textContent = score;
    var a = 2;
    var b = 16;
    // var c = 31;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving Snake
  //   console.log(snake[1]);
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }
  snake[0].x += inputDir.x;
  snake[0].y += inputDir.y;

  // Displaing Food and Snake
  // Displaying Snake
  snake.forEach(function (e, index) {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.id = "snakeHead";
    } else {
      snakeElement.id = "snakeBody";
    }
    game.appendChild(snakeElement);
  });

  // Displaying Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.id = "food";
  game.appendChild(foodElement);
}

/// Checking which key is pressed and moving snake
window.addEventListener("keydown", function (e) {
  if (e.key == "ArrowUp") {
    inputDir.x = 0;
    inputDir.y = -1;
  } else if (e.key == "ArrowDown") {
    inputDir.x = 0;
    inputDir.y = 1;
  } else if (e.key == "ArrowRight") {
    inputDir.x = 1;
    inputDir.y = 0;
  } else if (e.key == "ArrowLeft") {
    inputDir.x = -1;
    inputDir.y = 0;
  }
});
