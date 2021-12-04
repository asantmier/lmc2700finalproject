export default class InputHandler {

    constructor(player, game, canvas) {
        document.addEventListener('keydown', event => {
            switch (event.code) {
                case 'ArrowLeft':
                    player.moveLeft()
                    break
                case 'ArrowRight':
                    player.moveRight()
                    break
                case 'ArrowUp':
                    player.moveUp()
                    break
                case 'ArrowDown':
                    player.moveDown()
                    break
            }
        })

        document.addEventListener('keyup', event => {
            switch (event.code) {
                case 'ArrowLeft':
                    if (player.speed.x < 0)
                        player.stopx()
                    break
                case 'ArrowRight':
                    if (player.speed.x > 0)
                        player.stopx()
                    break
                case 'ArrowUp':
                    if (player.speed.y < 0)
                        player.stopy()
                    break
                case 'ArrowDown':
                    if (player.speed.y > 0)
                        player.stopy()
                    break
            }
        })

        document.addEventListener('click', event => {
            // Get the mouse coordinates relative to the canvas (event gives us relative to page)
            let rect = canvas.getBoundingClientRect()
            let x = event.x - rect.left
            let y = event.y - rect.top
            game.tiles.some((tile) => {
                // Check if tile is at click position
                if(tile.position.x <= x &&
                    tile.position.x + tile.width >= x &&
                    tile.position.y <= y &&
                    tile.position.y + tile.height >= y
                ) {
                    // Check if tile is in range of player
                    if(Math.abs(tile.position.x - player.position.x) <= 3.5 * tile.width &&
                        Math.abs(tile.position.y - player.position.y) <= 3.5 * tile.height
                    ) {
                        tile.clicked()
                    }
                    // Break from some() early
                    return true
                } else {
                    return false
                }
            })
        })
    }
}