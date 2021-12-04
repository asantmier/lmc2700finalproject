import lookup from './lookup.js'

export default class Tile {

    constructor(game, position) {
        this.image = document.getElementById('ground')

        this.game = game

        this.width = 50
        this.height = 50

        this.position = position

        this.fertile = false
        this.hydrated = false
        this.crop = null
        this.cropImage = document.getElementById('img_empty')
        this.stage = 0
    }

    clicked(tool, item) {
        if(tool === "tool1") {
            this.image = document.getElementById('ground_fertile')
            this.fertile = true
        }
        if(tool === "tool2") {
            if (this.fertile) {
                this.image = document.getElementById('ground_watered')
                this.hydrated = true
            }
        }
        if(tool === "tool3") {
            this.harvest()
        }
        if(item !== "inv0") {
            let type = document.getElementById(item + "type").innerText
            if(type == 'seed') {
                let parent = document.getElementById(item + "parent").innerText
                if (this.fertile && this.crop === null) {
                    this.plantSeed(parent)
                    this.game.subtractItem(1, parent, type)
                }
            }
        }
    }

    // Plant a seed of the given type of crop
    plantSeed(parent) {
        this.cropImage = lookup[parent].growthStages.stage1
        this.crop = parent
        this.stage = 1
    }

    // Removes crop from the tile and gives the player the results
    harvest() {
        if(this.crop === null) return
        
        // Only give yields if the crop is mature
        if(this.stage == lookup[this.crop].stages) {
            let min = lookup[this.crop].minYield
            let max = lookup[this.crop].maxYield
            let flex = Math.floor((max - min + 1) * Math.random())
            let productYield = min + flex
            this.game.addItem(productYield, this.crop, 'product')
        }

        // Remove crop and reset tile
        this.crop = null
        this.cropImage = document.getElementById('img_empty')
        this.stage = 0
    }

    grow() {
        // 2x more likely to grow if watered
        let bonus = 1.0
        if(this.hydrated)
            bonus = 2.0

        // Dehydrate the ground and untill it if there's no crop
        if(this.crop === null && this.hydrated == false) {
            this.image = document.getElementById('ground')
        } else {
            this.image = document.getElementById('ground_fertile')
        }
        this.hydrated = false

        // Leave early if no crop
        if(this.crop === null) return

        // If the crop is dead, leave early
        if(this.stage > lookup[this.crop].stages)
            return
            
        let chance = lookup[this.crop].randomGrowth
        // If the crop is still maturing
        if(this.stage < lookup[this.crop].stages) {
            if(Math.random() < (chance * bonus)) {
                this.stage++
                this.cropImage = lookup[this.crop].growthStages['stage' + this.stage]
            }
        // If the crop is mature
        } else {
            // Chance to die is the inverse of the chance to grow. If not watered, the chance to die is twice as likely
            if(Math.random() > chance / (2 / bonus)) {
                this.stage++
                this.cropImage = lookup[this.crop].growthStages['dead']
            }
        }
    }

    update(dt) {
        
    }

    draw(ctx) {
        // First draw the tile
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // Then draw the crop on top of it
        ctx.drawImage(this.cropImage, this.position.x, this.position.y, this.width, this.height)
    }
}