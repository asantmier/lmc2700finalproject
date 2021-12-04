export default class InputHandler {

    constructor(player, game, canvas) {
        this.invSlot = "inv1"
        this.toolSlot = "tool1"
        document.getElementById(this.invSlot).style.border = "1px solid white"
        document.getElementById(this.toolSlot).style.border = "1px solid white"

        document.addEventListener('keydown', event => {
            switch (event.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    player.moveLeft()
                    break
                case 'ArrowRight':
                case 'KeyD':
                    player.moveRight()
                    break
                case 'ArrowUp':
                case 'KeyW':
                    player.moveUp()
                    break
                case 'ArrowDown':
                case 'KeyS':
                    player.moveDown()
                    break
            }
        })

        document.addEventListener('keyup', event => {
            switch (event.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    if (player.speed.x < 0)
                        player.stopx()
                    break
                case 'ArrowRight':
                case 'KeyD':
                    if (player.speed.x > 0)
                        player.stopx()
                    break
                case 'ArrowUp':
                case 'KeyW':
                    if (player.speed.y < 0)
                        player.stopy()
                    break
                case 'ArrowDown':
                case 'KeyS':
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

        document.getElementById("tool1").addEventListener('click', event => {
            document.getElementById(this.toolSlot).style.border = "none"
            this.toolSlot = "tool1";
            document.getElementById(this.toolSlot).style.border = "1px solid white"
        })
        document.getElementById("tool2").addEventListener('click', event => {
            document.getElementById(this.toolSlot).style.border = "none"
            this.toolSlot = "tool2";
            document.getElementById(this.toolSlot).style.border = "1px solid white"
        })
        document.getElementById("tool3").addEventListener('click', event => {
            document.getElementById(this.toolSlot).style.border = "none"
            this.toolSlot = "tool3";
            document.getElementById(this.toolSlot).style.border = "1px solid white"
        })

        document.getElementById("inv1").addEventListener('click', event =>  {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv1";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv2").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv2";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv3").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv3";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv4").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv4";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv5").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv5";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv6").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv6";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv7").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv7";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv8").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv8";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv9").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv9";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv10").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv10";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv11").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv11";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv12").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv12";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv13").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv13";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv14").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv14";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv15").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv15";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv16").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv16";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv17").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv17";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv18").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv18";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv19").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv19";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
        document.getElementById("inv20").addEventListener('click', event => {
            document.getElementById(this.invSlot).style.border = "none"
            this.invSlot = "inv20";
            document.getElementById(this.invSlot).style.border = "1px solid white"
        })
    }
}

