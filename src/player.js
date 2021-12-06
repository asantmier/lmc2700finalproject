export default class Player {

    constructor(game) {
        this.image = document.getElementById('img_circle')

        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight

        this.width = 50
        this.height = 50

        // Speed is in pixels per second
        this.maxSpeed = 300
        this.speed = {
            x: 0,
            y: 0,
        }

        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight / 2 - this.height / 2,
        }
    }

    moveLeft() {
        this.speed.x = -this.maxSpeed
    }

    moveRight() {
        this.speed.x = this.maxSpeed
    }

    moveUp() {
        this.speed.y = -this.maxSpeed
    }

    moveDown() {
        this.speed.y = this.maxSpeed
    }

    stopx() {
        this.speed.x = 0
    }

    stopy() {
        this.speed.y = 0
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update(dt) {
        // Divide by 1000 so that speed can be in pixels per second
        this.position.x += this.speed.x * (dt / 1000)
        this.position.y += this.speed.y * (dt / 1000)
        
        // Keep the player inside the screen (for now)
        if (this.position.x < 0) this.position.x = 0
        if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width
        if (this.position.y < 0) this.position.y = 0
        if (this.position.y + this.height > this.gameHeight) this.position.y = this.gameHeight - this.height
    }
}