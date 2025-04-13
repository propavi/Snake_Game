let gameContainer = document.querySelector(".game-container");

let foodX, foodY;
let headX = 12, headY = 12;
let velocityX = 0, velocityY = 0;
let snakeBody = [[12, 12]]; // Start with a single body segment

// Generate random food position
function generateFood() {
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
}

// Game Over Function
function gameOver() {
    alert("Game Over!");
    headX = 12;
    headY = 12;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [[12, 12]]; // Reset snake
    generateFood();
}

// Game Render Function
function renderGame() {
    // Move the head
    headX += velocityX;
    headY += velocityY;

    // Check for Game Over (out of bounds)
    if (headX < 1 || headY < 1 || headX > 25 || headY > 25) {
        gameOver();
        return;
    }

    // Check if snake eats food
    if (headX === foodX && headY === foodY) {
        snakeBody.push([foodX, foodY]); // Grow the snake
        generateFood(); // Generate new food
    }

    // Move the snake body (shift positions)
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]]; // Copy previous segment position
    }
    snakeBody[0] = [headX, headY]; // Update the head position

    // Check if snake collides with itself
    for (let i = 1; i < snakeBody.length; i++) {
        if (headX === snakeBody[i][0] && headY === snakeBody[i][1]) {
            gameOver();
            return;
        }
    }

    // Render game elements
    let updatedGame = `<div class="food-item" style="grid-area: ${foodY}/${foodX};"></div>`;

    for (let i = 0; i < snakeBody.length; i++) {
        updatedGame += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    }

    gameContainer.innerHTML = updatedGame;
}

// Start the game loop
generateFood();
setInterval(renderGame, 150);

// Keyboard controls
document.addEventListener("keydown", function (e) {
    let key = e.key;
    if (key === "ArrowUp" && velocityY === 0) {
        velocityX = 0;
        velocityY = -1;
    } else if (key === "ArrowDown" && velocityY === 0) {
        velocityX = 0;
        velocityY = 1;
    } else if (key === "ArrowLeft" && velocityX === 0) {
        velocityX = -1;
        velocityY = 0;
    } else if (key === "ArrowRight" && velocityX === 0) {
        velocityX = 1;
        velocityY = 0;
    }
});
