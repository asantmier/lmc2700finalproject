/* lookup is a big dictionary for every crop in the game.

Notes:
    stages must be equal to the number of stages in growthStages
    Cost and sell values determine how much money the player has to pay or earns from buying or selling
    A randomGrowth value of 1.0 will also make the plant immortal and must be greater than 0.0
    You can set min and max yield equal to make the same amount of product drop every time
*/
let lookup = {
    plant: {
        seed: {
            name: "Plant Seed",
            sprite: "assets/images/plant_seed.png",
            cost: 10,
            sell: 5,
        },
        product: {
            name: "Plant Flower",
            sprite: "assets/images/plant_product.png",
            sell: 100,
        },
        growthStages: {
            stage1: document.getElementById("plant_stage_1"),
            stage2: document.getElementById("plant_stage_2"),
            stage3: document.getElementById("plant_stage_3"),
            dead: document.getElementById("plant_dead"),
        },
        name: "Plant",
        stages: 3,
        randomGrowth: 0.80,
        minYield: 1,
        maxYield: 4,
    },
  /*plantName: {
        seed: {
            name: "Seed name",
            sprite: "assets/images/path_to_seed_texture.png",
            cost: 10,
            sell: 5,
        },
        product: {
            name: "Product name",
            sprite: "assets/images/path_to_product_texture.png",
            sell: 100,
        },
        growthStages: {
            stage1: document.getElementById("id_of_plant_stage_in_index.html"),
            stage2: document.getElementById("plant_stage_2"),
            stage3: document.getElementById("plant_stage_3"),
            stage4: document.getElementById("plant_stage_4"),
            dead: document.getElementById("id_of_dead_plant_in_index.html"),
        },
        name: "Name of plant",
        stages: 4,
        randomGrowth: 0.60,
        minYield: 2,
        maxYield: 3,
    },*/
}

export default lookup