// Matt Castagna
// Asset Packs: By LimeZu https://limezu.itch.io/modernexteriors, https://limezu.itch.io/moderninteriors
// Font: https://www.dafont.com/highschool-nostalgia.font
// Music: The Wood Brothers - Postcards From Hell (can send email permission if needed)
// Other: Help with getting interactions to work in a non buggy way https://pablo.gg/en/blog/coding/how-to-create-a-top-down-rpg-maker-like-game-with-phaser-js-and-react/
// Phaser major components: Physics/Collision/Overlap, Tilemaps, Dialogue, Animations, Interactables, Player Movement
// There are personal photos of me and my friend and I would ask that you do not share them. 

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    pixelArt: true,
    //backgroundColor: '#000000', // use to test size
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [ Menu, Credits, Play, PlayTwo, Letter ]
}

let game = new Phaser.Game(config)
let backgroundMusic