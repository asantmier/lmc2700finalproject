import Game from "./game.js"

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d")

// Set the size of our canvas
const GAME_WIDTH = 800
const GAME_HEIGHT = 600

let game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas)
// Start the game
game.start()

let lastTime = 0
function gameLoop(timestamp) {
    let dt = timestamp - lastTime
    lastTime = timestamp
    // dt: delta time

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // IMPORTANT dt is in milliseconds, not seconds!
    game.update(dt)
    game.draw(ctx)

    requestAnimationFrame(gameLoop)
}

// Start our loop on the first frame the browser gives us
requestAnimationFrame(gameLoop)

