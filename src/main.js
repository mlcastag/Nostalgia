// Matt Castagna
// Font: https://www.dafont.com/highschool-nostalgia.font

'use strict'

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