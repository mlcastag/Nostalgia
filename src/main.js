// Matt Castagna
// Font: https://www.dafont.com/highschool-nostalgia.font
// Music: The Wood Brothers (can send email permission if needed)
// Other: Help with getting interactions to work in a non buggy way https://pablo.gg/en/blog/coding/how-to-create-a-top-down-rpg-maker-like-game-with-phaser-js-and-react/

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
    scene: [ Menu, Play, Letter ]
}

let game = new Phaser.Game(config)