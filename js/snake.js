const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake, food, dx, dy, score, game;

function init() {
  snake = [{ x: 200, y: 200 }];
  food = randomFood();
  dx = box;
  dy = 0;
  score = 0;
  document.getElementById("score").innerText = score;

  clearInterval(game);
  game = setInterval(draw, 180); // slower speed
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
  if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
  if (e.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
  if (e.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
});

function collision(head, body) {
  return body.some(seg => seg.x === head.x && seg.y === head.y);
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, 400, 400);

  // Snake (rounded)
  snake.forEach((s, i) => {
    ctx.fillStyle = i === 0 ? "#00ffcc" : "#00cc99";
    ctx.beginPath();
    ctx.arc(s.x + box / 2, s.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.y < 0 ||
    head.x >= 400 || head.y >= 400 ||
    collision(head, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Score: " + score);
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = randomFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function restartGame() {
  init();
}

init();