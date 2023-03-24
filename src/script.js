// Initialize the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up the ball, paddles, and scores
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 5,
  dy: 5,
  radius: 10
};

const playerPaddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 20
};

const computerPaddle = {
  x: canvas.width / 2 - 40,
  y: 10,
  width: 80,
  height: 10,
  speed: 8
};

let playerScore = 0;
let computerScore = 0;

// Draw the ball, paddles, and scores
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(paddle) {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.closePath();
}

function drawScores() {
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(playerScore, canvas.width / 2, canvas.height - 50);
  ctx.fillText(computerScore, canvas.width / 2, 50);
}

// Move the ball and paddles
function moveBall() {
  // Bounce off walls
  if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y - ball.radius <= 0) {
    ball.dy = -ball.dy;
    playerScore++;
  }
  if (ball.y + ball.radius >= canvas.height) {
    ball.dy = -ball.dy;
    computerScore++;
  }

  // Check for paddle collision
  if (ball.y + ball.radius >= playerPaddle.y && ball.x >= playerPaddle.x && ball.x <= playerPaddle.x + playerPaddle.width) {
    ball.dy = -ball.dy;
  }
  if (ball.y - ball.radius <= computerPaddle.y + computerPaddle.height && ball.x >= computerPaddle.x && ball.x <= computerPaddle.x + computerPaddle.width) {
    ball.dy = -ball.dy;
  }

  // Update ball position
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function movePlayerPaddle(direction) {
  if (direction === 'left' && playerPaddle.x > 0) {
    playerPaddle.x -= playerPaddle.speed;
  } else if (direction === 'right' && playerPaddle.x + playerPaddle.width < canvas.width) {
    playerPaddle.x += playerPaddle.speed;
  }
}

function moveComputerPaddle() {
  if (ball.x < computerPaddle.x + computerPaddle.width / 2 && computerPaddle.x > 0) {
    computerPaddle.x -= computerPaddle.speed;
  } else if (ball.x > computerPaddle.x + computerPaddle.width / 2 && computerPaddle.x + computerPaddle.width < canvas.width) {
    computerPaddle.x += computerPaddle.speed;
  }
}

// Game loop
function gameLoop() {
// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Move the ball and paddles
moveBall();
drawBall();
movePlayerPaddle();
drawPaddle(playerPaddle);
moveComputerPaddle();
drawPaddle(computerPaddle);

// Draw the scores
drawScores();

// Check for game over
if (playerScore >= 10) {
alert('You win!');
document.location.reload();
} else if (computerScore >= 10) {
alert('You lose!');
document.location.reload();
}

// Call the game loop again
requestAnimationFrame(gameLoop);
}

// Handle keyboard input
document.addEventListener('keydown', event => {
if (event.code === 'ArrowLeft') {
movePlayerPaddle('left');
} else if (event.code === 'ArrowRight') {
movePlayerPaddle('right');
}
});

// Start the game loop
gameLoop();
