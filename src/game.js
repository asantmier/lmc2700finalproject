import Player from './player.js'
import InputHandler from './input.js'
import Tile from './tile.js'
import lookup from './lookup.js'

export default class Game {
    // It could take HUD start height, and height as well TODO
    constructor(gameWidth, gameHeight, canvas) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.player = new Player(this)
        this.tiles = []
        this.gameObjects = []
        this.time = 60 * 7
        this.day = 1

        new InputHandler(this.player, this, canvas)
        this.addItem(6, 'plant', 'seed')
    }

    start() {
        // Create a grid of tiles on the canvas
        for(let i = 0; i < 16; i++) {
            for(let j = 0; j < 12; j++) {
                let position = {
                    x: i * 50,
                    y: j * 50
                }
                let tile = new Tile(this, position)
                this.tiles.push(tile)
            }
        }
        // The last element in gameObjects gets drawn last (on top of the others)
        this.gameObjects = [...this.tiles, this.player]
    }

    update(dt) {
        this.gameObjects.forEach((object) => object.update(dt))

        // Update time
        this.time += 2 * dt / 1000
        let hour = Math.floor(this.time / 60)
        let hPad = ""
        if(hour < 10)
            hPad = "0"
        let minute = Math.floor(this.time % 60)
        let mPad = ""
        if(minute < 10)
            mPad = "0"
        document.getElementById('time').innerText = "Day " + this.day + " " + hPad + hour + ":" + mPad + minute
        // If the clock hits midnight, move on to the next day
        if(this.time >= 24 * 60) {
            this.endDay()
        }
    }

    draw(ctx) {
        this.gameObjects.forEach((object) => object.draw(ctx))
    }
    
    // Grow all crops and proceed to next day
    endDay() {
        this.day++
        this.time = 60 * 7
        this.tiles.forEach((tile) => tile.grow())
    }

    // Adds an item to the inventory
    addItem(count, parent, type) {
        // Search for item
        for(let i = 1; i <= 20; i++) {
            let p = document.getElementById("inv" + i + "parent").innerText
            let t = document.getElementById("inv" + i + "type").innerText
            if(p == parent && t == type) {
                document.getElementById("inv" + i + "count").innerText = eval(document.getElementById("inv" + i + "count").innerText) + eval(count)
                return
            }
        }
        // Add new item
        for(let i = 1; i <= 20; i++) {
            let ct = document.getElementById("inv" + i + "count").innerText
            if(ct === "") {
                document.getElementById("inv" + i + "count").innerText = count
                document.getElementById("inv" + i + "sprite").src = lookup[parent][type].sprite
                document.getElementById("inv" + i + "name").innerText = lookup[parent][type].name
                document.getElementById("inv" + i + "parent").innerText = parent
                document.getElementById("inv" + i + "type").innerText = type
                return
            }
        }
    }

    // Subtracts an item from the inventory
    subtractItem(count, parent, type) {
        for(let i = 1; i <= 20; i++) {
            let p = document.getElementById("inv" + i + "parent").innerText
            let t = document.getElementById("inv" + i + "type").innerText
            if(p == parent && t == type) {
                document.getElementById("inv" + i + "count").innerText = eval(document.getElementById("inv" + i + "count").innerText) - eval(count)
                if(document.getElementById("inv" + i + "count").innerText <= 0) {
                    document.getElementById("inv" + i + "count").innerText = ""
                    document.getElementById("inv" + i + "sprite").src = "assets/images/empty.png"
                    document.getElementById("inv" + i + "name").innerText = ""
                    document.getElementById("inv" + i + "parent").innerText = ""
                    document.getElementById("inv" + i + "type").innerText = ""
                }
                break
            }
        }
    }

}

