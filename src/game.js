import Player from './player.js'
import InputHandler from './input.js'
import Tile from './tile.js'

export default class Game {
    constructor(gameWidth, gameHeight, canvas) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight

        this.player = new Player(this)
        this.tiles = []
        this.gameObjects = []

        new InputHandler(this.player, this, canvas)
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
    }

    draw(ctx) {
        this.gameObjects.forEach((object) => object.draw(ctx))
    }
}