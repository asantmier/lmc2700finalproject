import lookup from "./lookup.js"

export default class InputHandler {

    constructor(player, game, canvas) {
        this.invSlot = "inv0"
        this.toolSlot = "tool0"

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
                case 'Space':
                    game.endDay()
                    break
                case 'Digit1':
                    this.selectTool("tool1")
                    break
                case 'Digit2':
                    this.selectTool("tool2")
                    break
                case 'Digit3':
                    this.selectTool("tool3")
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

        this.buySlot = "buyinv0"
        this.sellSlot = "sellinv0"

        // Some more quick priveledged methods to help out below
        this.selectBuy = function(id) {
            // Reset border styling
            document.getElementById(this.buySlot).style.border = "none"
            // Reset buy slot and related visuals
            this.buySlot = "buyinv0"
            document.getElementById("buyName").innerText = "Item"
            document.getElementById("buyValue").innerText = "Price"
            // Select buy slot
            this.buySlot = id;
            // Apply styling
            document.getElementById(this.buySlot).style.border = "1px solid white"
            if(id !== "buyinv0") {
                // Set up display
                let parent = document.getElementById(id + "parent").innerText
                let type = document.getElementById(id + "type").innerText
                // Make sure the user has selected a non empty slot
                if(parent !== '') {
                    document.getElementById("buyName").innerText = lookup[parent][type].name
                    document.getElementById("buyValue").innerText = "$" + lookup[parent][type].cost
                }
            }
        }

        this.selectSell = function(id) {
            // Reset border styling
            document.getElementById(this.sellSlot).style.border = "none"
            // Reset sell slot and related visuals
            this.sellSlot = "sellinv0"
            document.getElementById("sellName").innerText = "Item"
            document.getElementById("sellValue").innerText = "Price"
            document.getElementById("sellSlider").max = 1
            document.getElementById("sellSlider").value = 1
            document.getElementById("sellSliderText").innerText = "#"
            document.getElementById("sellMoneyText").innerText = "$0"
            // Select sell slot
            this.sellSlot = id;
            // Apply styling
            document.getElementById(this.sellSlot).style.border = "1px solid white"
            if(id !== "sellinv0") {
                // Set up display
                let parent = document.getElementById(id + "parent").innerText
                let type = document.getElementById(id + "type").innerText
                // Make sure the user has selected a non empty slot
                if(parent !== '') {
                    document.getElementById("sellName").innerText = lookup[parent][type].name
                    document.getElementById("sellValue").innerText = "$" + lookup[parent][type].sell
                    let count = eval(document.getElementById(id + "count").innerText)
                    document.getElementById("sellSlider").max = count
                    document.getElementById("sellSlider").value = count
                    document.getElementById("sellSliderText").innerText = count
                    document.getElementById("sellMoneyText").innerText = "$" + (count * lookup[parent][type].sell)
                }
            }
        }

        // Event handler for updating the sell slider
        document.getElementById("sellSlider").addEventListener('input', event => {
            let value = document.getElementById("sellSlider").value
            document.getElementById("sellSliderText").innerText = value
            let parent = document.getElementById(this.sellSlot + "parent").innerText
            let type = document.getElementById(this.sellSlot + "type").innerText
            document.getElementById("sellMoneyText").innerText = "$" + (value * lookup[parent][type].sell)
        })

        // Repopulates the sell menu based on the player's inventory
        this.populateSellMenu = function() {
            for(let i = 1; i <= 20; i++) {
                let count = document.getElementById("inv" + i + "count").innerText
                let parent = document.getElementById("inv" + i + "parent").innerText
                let type = document.getElementById("inv" + i + "type").innerText

                document.getElementById("sellinv" + i + "count").innerText = count
                document.getElementById("sellinv" + i + "parent").innerText = parent
                document.getElementById("sellinv" + i + "type").innerText = type
                if(parent !== '') {
                    document.getElementById("sellinv" + i + "sprite").src = lookup[parent][type].sprite
                } else {
                    document.getElementById("sellinv" + i + "sprite").src = "assets/images/empty.png"
                }
            }
        }

        // Shop opening and closing
        document.getElementById("shopBtn").addEventListener('click', event => {
            document.getElementById("shopMenu").style.display = "block";
            this.populateSellMenu()
        })

        document.getElementById("shopClose").addEventListener('click', event => {
            document.getElementById("shopMenu").style.display = "none";
            // Resets the menu
            this.selectBuy("buyinv0")
            this.selectSell("sellinv0")
        })

        document.getElementById("sellBtn").addEventListener('click', event => {
            if(this.sellSlot !== "sellslot0") {
                let parent = document.getElementById(this.sellSlot + "parent").innerText
                let type = document.getElementById(this.sellSlot + "type").innerText
                // Checks if the user has selected an non empty slot
                if(parent !== '') {
                    let count = document.getElementById("sellSlider").value
                    game.subtractItem(count, parent, type)
                    game.giveMoney(lookup[parent][type].sell * count)
                    // This does the same thing as reopening the shop and selecting the item. Slow but it works
                    this.populateSellMenu()
                    this.selectSell(this.sellSlot)
                }
            }
        })

        document.getElementById("buyBtn").addEventListener('click', event => {
            if(this.buySlot !== "buyinv0") {
                let parent = document.getElementById(this.buySlot + "parent").innerText
                let type = document.getElementById(this.buySlot + "type").innerText
                if(parent !== '') {
                    game.addItem(1, parent, type)
                    game.giveMoney(-lookup[parent][type].cost)
                }
            }
        })

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

        // Selecting Sell Items
        document.getElementById("sellinv1").addEventListener('click', event =>  {
            this.selectSell("sellinv1")
        })
        document.getElementById("sellinv2").addEventListener('click', event => {
            this.selectSell("sellinv2")
        })
        document.getElementById("sellinv3").addEventListener('click', event => {
            this.selectSell("sellinv3")
        })
        document.getElementById("sellinv4").addEventListener('click', event => {
            this.selectSell("sellinv4")
        })
        document.getElementById("sellinv5").addEventListener('click', event => {
            this.selectSell("sellinv5")
        })
        document.getElementById("sellinv6").addEventListener('click', event => {
            this.selectSell("sellinv6")
        })
        document.getElementById("sellinv7").addEventListener('click', event => {
            this.selectSell("sellinv7")
        })
        document.getElementById("sellinv8").addEventListener('click', event => {
            this.selectSell("sellinv8")
        })
        document.getElementById("sellinv9").addEventListener('click', event => {
            this.selectSell("sellinv9")
        })
        document.getElementById("sellinv10").addEventListener('click', event => {
            this.selectSell("sellinv10")
        })
        document.getElementById("sellinv11").addEventListener('click', event => {
            this.selectSell("sellinv11")
        })
        document.getElementById("sellinv12").addEventListener('click', event => {
            this.selectSell("sellinv12")
        })
        document.getElementById("sellinv13").addEventListener('click', event => {
            this.selectSell("sellinv13")
        })
        document.getElementById("sellinv14").addEventListener('click', event => {
            this.selectSell("sellinv14")
        })
        document.getElementById("sellinv15").addEventListener('click', event => {
            this.selectSell("sellinv15")
        })
        document.getElementById("sellinv16").addEventListener('click', event => {
            this.selectSell("sellinv16")
        })
        document.getElementById("sellinv17").addEventListener('click', event => {
            this.selectSell("sellinv17")
        })
        document.getElementById("sellinv18").addEventListener('click', event => {
            this.selectSell("sellinv18")
        })
        document.getElementById("sellinv19").addEventListener('click', event => {
            this.selectSell("sellinv19")
        })
        document.getElementById("sellinv20").addEventListener('click', event => {
            this.selectSell("sellinv20")
        })

        // Selecting Buy Items
        document.getElementById("buyinv1").addEventListener('click', event =>  {
            this.selectBuy("buyinv1")
        })
        document.getElementById("buyinv2").addEventListener('click', event => {
            this.selectBuy("buyinv2")
        })
        document.getElementById("buyinv3").addEventListener('click', event => {
            this.selectBuy("buyinv3")
        })
        document.getElementById("buyinv4").addEventListener('click', event => {
            this.selectBuy("buyinv4")
        })
        document.getElementById("buyinv5").addEventListener('click', event => {
            this.selectBuy("buyinv5")
        })
        document.getElementById("buyinv6").addEventListener('click', event => {
            this.selectBuy("buyinv6")
        })
        document.getElementById("buyinv7").addEventListener('click', event => {
            this.selectBuy("buyinv7")
        })
        document.getElementById("buyinv8").addEventListener('click', event => {
            this.selectBuy("buyinv8")
        })
        document.getElementById("buyinv9").addEventListener('click', event => {
            this.selectBuy("buyinv9")
        })
        document.getElementById("buyinv10").addEventListener('click', event => {
            this.selectBuy("buyinv10")
        })
        document.getElementById("buyinv11").addEventListener('click', event => {
            this.selectBuy("buyinv11")
        })
        document.getElementById("buyinv12").addEventListener('click', event => {
            this.selectBuy("buyinv12")
        })
        document.getElementById("buyinv13").addEventListener('click', event => {
            this.selectBuy("buyinv13")
        })
        document.getElementById("buyinv14").addEventListener('click', event => {
            this.selectBuy("buyinv14")
        })
        document.getElementById("buyinv15").addEventListener('click', event => {
            this.selectBuy("buyinv15")
        })
        document.getElementById("buyinv16").addEventListener('click', event => {
            this.selectBuy("buyinv16")
        })
        document.getElementById("buyinv17").addEventListener('click', event => {
            this.selectBuy("buyinv17")
        })
        document.getElementById("buyinv18").addEventListener('click', event => {
            this.selectBuy("buyinv18")
        })
        document.getElementById("buyinv19").addEventListener('click', event => {
            this.selectBuy("buyinv19")
        })
        document.getElementById("buyinv20").addEventListener('click', event => {
            this.selectBuy("buyinv20")
        })
        document.getElementById("buyinv21").addEventListener('click', event => {
            this.selectBuy("buyinv21")
        })
        document.getElementById("buyinv22").addEventListener('click', event => {
            this.selectBuy("buyinv22")
        })
        document.getElementById("buyinv23").addEventListener('click', event => {
            this.selectBuy("buyinv23")
        })
        document.getElementById("buyinv24").addEventListener('click', event => {
            this.selectBuy("buyinv24")
        })
        document.getElementById("buyinv25").addEventListener('click', event => {
            this.selectBuy("buyinv25")
        })
        document.getElementById("buyinv26").addEventListener('click', event => {
            this.selectBuy("buyinv26")
        })
        document.getElementById("buyinv27").addEventListener('click', event => {
            this.selectBuy("buyinv27")
        })
        document.getElementById("buyinv28").addEventListener('click', event => {
            this.selectBuy("buyinv28")
        })
        document.getElementById("buyinv29").addEventListener('click', event => {
            this.selectBuy("buyinv29")
        })
        document.getElementById("buyinv30").addEventListener('click', event => {
            this.selectBuy("buyinv30")
        })
        document.getElementById("buyinv31").addEventListener('click', event => {
            this.selectBuy("buyinv31")
        })
        document.getElementById("buyinv32").addEventListener('click', event => {
            this.selectBuy("buyinv32")
        })
        document.getElementById("buyinv33").addEventListener('click', event => {
            this.selectBuy("buyinv33")
        })
        document.getElementById("buyinv34").addEventListener('click', event => {
            this.selectBuy("buyinv34")
        })
        document.getElementById("buyinv35").addEventListener('click', event => {
            this.selectBuy("buyinv35")
        })
        document.getElementById("buyinv36").addEventListener('click', event => {
            this.selectBuy("buyinv36")
        })
        document.getElementById("buyinv37").addEventListener('click', event => {
            this.selectBuy("buyinv37")
        })
        document.getElementById("buyinv38").addEventListener('click', event => {
            this.selectBuy("buyinv38")
        })
        document.getElementById("buyinv39").addEventListener('click', event => {
            this.selectBuy("buyinv39")
        })
        document.getElementById("buyinv40").addEventListener('click', event => {
            this.selectBuy("buyinv40")
        })
    }
}

