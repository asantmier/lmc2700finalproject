export default class Tile {

    constructor(game, position) {
        this.image = document.getElementById('img_square_outline')

        this.game = game

        this.width = 50
        this.height = 50

        this.position = position
    }

    clicked(tool, item) {
        if(tool === "tool1") {
            this.image = document.getElementById('img_square_outline_filled')
        }
    }

    update(dt) {
        
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}