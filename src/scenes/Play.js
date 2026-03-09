class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    init(){
        this.speed = 200
    }

    create(){

        // Add map
        const map = this.add.tilemap('concert')
        const tileset = map.addTilesetImage('tileset','tiles')
        const floorLayer = map.createLayer('floorLayer', tileset, 0 , 0)
        this.objectLayer = map.createLayer('objectLayer', tileset, 0 , 0)
        
        // Add player
        this.player = this.physics.add.sprite(705, 550, 'player', 3)
        this.player.body.setSize(this.player.width, 48)
        this.player.body.setOffset(0, this.player.height - 48)
        this.player.body.setCollideWorldBounds(true)
        
        // Collision
        this.objectLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, this.objectLayer)

        this.interactPrompt = this.add.text(500, 500, 'Press \'E\' to interact', {
            font: 'Arial',
            fill: '#ffffff'
        })
        this.interactPrompt.setVisible(false)

        // Keys
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)

        // For skip
        this.keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update(){

        // Dev skip
        if(Phaser.Input.Keyboard.JustDown(this.keySTART)){
            this.scene.start('letterScene')
        }

        // Movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown){
            this.direction.x = -1
        }else if(this.cursors.right.isDown){
            this.direction.x = 1
        }

        if(this.cursors.up.isDown){
            this.direction.y = -1
        }else if(this.cursors.down.isDown){
            this.direction.y = 1
        }
        this.direction.normalize()
        this.player.setVelocity(this.speed * this.direction.x, this.speed * this.direction.y)

        // Player/Tile interactions
        const playerX = this.objectLayer.worldToTileX(this.player.x - this.player.width / 2)
        const playerY = this.objectLayer.worldToTileX(this.player.y - this.player.width / 2)
        const tileWidth = Math.round(this.player.width / this.objectLayer.tilemap.tileWidth)
        const tileHeight = Math.round(this.player.height / this.objectLayer.tilemap.tileHeight)

        const tile = this.objectLayer.findTile(tile => tile.properties.interact, playerX, playerY, tileWidth, tileHeight)

        if(tile){
            this.interactPrompt.setPosition(this.player.x - this.interactPrompt.width / 2, this.player.y - 40)
            this.interactPrompt.setVisible(true)

            if(Phaser.Input.Keyboard.JustDown(this.keyINTERACT)){
                this.interactions(tile.properties.interact)
            }

    }else{
        this.interactPrompt.setVisible(false)
    }
}

    interactions(prompt){
        switch(prompt){
            case 'Food Truck':
                console.log('Dialogue would play')
                break
        }
    }
}