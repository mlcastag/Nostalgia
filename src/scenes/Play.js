class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    preload(){

    }

    create(){

        const map = this.add.tilemap('concert')
        const tileset = map.addTilesetImage('tileset','tiles')
        const floorLayer = map.createLayer('floorLayer', tileset, 0 , 0)
        const objectLayer = map.createLayer('objectLayer', tileset, 0 , 0)
        
        this.player = this.physics.add.sprite(705, 550, 'player', 3)
        this.player.body.setCollideWorldBounds(true)
        
    }

    update(){

    }
}