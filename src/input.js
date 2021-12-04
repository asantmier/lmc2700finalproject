export default class InputHandler {

    constructor(player, game, canvas) {
        this.invSlot = "inv0"
        this.toolSlot = "tool0"

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
                        tile.clicked(this.toolSlot, this.invSlot)
                    }
                    // Break from some() early
                    return true
                } else {
                    return false
                }
            })
        })

        // Some quick priveledged methods to help out below
        this.selectTool = function(id) {
            // Reset border styling
            document.getElementById(this.toolSlot).style.border = "none"
            document.getElementById(this.invSlot).style.border = "none"
            // Reset selected things
            this.toolSlot = "tool0"
            this.invSlot = "inv0"
            // Select thing
            this.toolSlot = id;
            // Apply styling
            document.getElementById(this.toolSlot).style.border = "1px solid white"
            // Clear item name display
            document.getElementById("itemName").innerText = ""
        }

        this.selectInv = function(id) {
            document.getElementById(this.toolSlot).style.border = "none"
            document.getElementById(this.invSlot).style.border = "none"
            this.toolSlot = "tool0"
            this.invSlot = "inv0"
            this.invSlot = id;
            document.getElementById(this.invSlot).style.border = "1px solid white"
            // Set item name display
            document.getElementById("itemName").innerText = document.getElementById(this.invSlot + "name").innerText
        }

        // Selecting Tools
        document.getElementById("tool1").addEventListener('click', event => {
            this.selectTool("tool1")
        })
        document.getElementById("tool2").addEventListener('click', event => {
            this.selectTool("tool2")
        })
        document.getElementById("tool3").addEventListener('click', event => {
            this.selectTool("tool3")
        })

        // Selecting Items
        document.getElementById("inv1").addEventListener('click', event =>  {
            this.selectInv("inv1")
        })
        document.getElementById("inv2").addEventListener('click', event => {
            this.selectInv("inv2")
        })
        document.getElementById("inv3").addEventListener('click', event => {
            this.selectInv("inv3")
        })
        document.getElementById("inv4").addEventListener('click', event => {
            this.selectInv("inv4")
        })
        document.getElementById("inv5").addEventListener('click', event => {
            this.selectInv("inv5")
        })
        document.getElementById("inv6").addEventListener('click', event => {
            this.selectInv("inv6")
        })
        document.getElementById("inv7").addEventListener('click', event => {
            this.selectInv("inv7")
        })
        document.getElementById("inv8").addEventListener('click', event => {
            this.selectInv("inv8")
        })
        document.getElementById("inv9").addEventListener('click', event => {
            this.selectInv("inv9")
        })
        document.getElementById("inv10").addEventListener('click', event => {
            this.selectInv("inv10")
        })
        document.getElementById("inv11").addEventListener('click', event => {
            this.selectInv("inv11")
        })
        document.getElementById("inv12").addEventListener('click', event => {
            this.selectInv("inv12")
        })
        document.getElementById("inv13").addEventListener('click', event => {
            this.selectInv("inv13")
        })
        document.getElementById("inv14").addEventListener('click', event => {
            this.selectInv("inv14")
        })
        document.getElementById("inv15").addEventListener('click', event => {
            this.selectInv("inv15")
        })
        document.getElementById("inv16").addEventListener('click', event => {
            this.selectInv("inv16")
        })
        document.getElementById("inv17").addEventListener('click', event => {
            this.selectInv("inv17")
        })
        document.getElementById("inv18").addEventListener('click', event => {
            this.selectInv("inv18")
        })
        document.getElementById("inv19").addEventListener('click', event => {
            this.selectInv("inv19")
        })
        document.getElementById("inv20").addEventListener('click', event => {
            this.selectInv("inv20")
        })
    }
}

