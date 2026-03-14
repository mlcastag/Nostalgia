class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    init(){
        this.speed = 200
        this.looking = 'up'
        this.foodTrucks = 0
        this.stage = 0
        this.sweetTea = 0
    }

    create(){

        // Add map
        const map = this.add.tilemap('concert')
        const tileset = map.addTilesetImage('tileset','tiles')
        const floorLayer = map.createLayer('floorLayer', tileset, 0 , 0)
        this.objectLayer = map.createLayer('objectLayer', tileset, 0 , 0)
        
        // Add band
        this.singer = this.add.sprite(this.scale.width / 2, this.scale.height / 2.3, 'singer')
        this.drummer = this.add.sprite(this.scale.width / 2.6, this.scale.height / 2.4, 'drum')
        this.guitar = this.add.sprite(this.scale.width / 1.6, this.scale.height / 2.4, 'guitar')

        // Band Animations
        this.anims.create({
            key: 'singerAnim',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('singer', {start: 0, end: 5})
        })
        this.singer.play('singerAnim')
        this.anims.create({
            key: 'drumAnim',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('drum', {start: 0, end: 11})
        })
        this.drummer.play('drumAnim')
        this.anims.create({
            key: 'guitarAnim',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('guitar', {start: 0, end: 11})
        })
        this.guitar.play('guitarAnim')


        // Add player
        this.player = this.physics.add.sprite(705, 550, 'player', 3)
        this.player.body.setSize(this.player.width, 48)
        this.player.body.setOffset(0, this.player.height - 48)
        this.player.body.setCollideWorldBounds(true)

        // Player animations
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 96, end: 101})
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 102, end: 107})
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 108, end: 113})
        })
        this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 114, end: 119})
        })
        
        
        // Text 
        this.tempBox = this.add.image(this.scale.width / 2, this.scale.height + -100, 'tempBox').setScale(.3)
        this.tempBox.setVisible(false)

        this.dialogue = this.add.text(this.tempBox.x + 15, this.tempBox.y + 50, 'test', {
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            wordWrap: {width: this.tempBox.width - 50}
        }).setOrigin(0.5, 0.5)
        this.dialogue.setVisible(false)

        this.interactPrompt = this.add.text(500, 500, 'Press \'E\' to interact', {
            font: 'Arial',
            fill: '#ffffff'
        })
        this.interactPrompt.setVisible(false)

        this.leavePrompt = this.add.text(0, 0, 'Press \'SPACE\' to continue', {
            font: 'Arial',
            fill: '#ffffff'
        })
        this.leavePrompt.setVisible(false)

        // Collision
        this.objectLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, this.objectLayer)

        // Keys
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update(){

        // Continue
        if(Phaser.Input.Keyboard.JustDown(this.keySTART) && this.foodTrucks == 1 && this.stage == 1 && this.sweetTea == 1/* && other conditions */){
            this.scene.start('letterScene')
        }

        if(this.foodTrucks == 1 && this.stage == 1 && this.sweetTea == 1/* && other conditions */){
            this.leavePrompt.setVisible(true)
            this.leavePrompt.setPosition(this.player.x - 60, this.player.y - 55)
        }

        // Movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown){
            this.direction.x = -1
            this.looking = 'left'
        }else if(this.cursors.right.isDown){
            this.direction.x = 1
            this.looking = 'right'
        }
        if(this.cursors.up.isDown){
            this.direction.y = -1
            this.looking = 'up'
        }else if(this.cursors.down.isDown){
            this.direction.y = 1
            this.looking = 'down'
        }
        this.direction.normalize()
        this.player.setVelocity(this.speed * this.direction.x, this.speed * this.direction.y)
        this.player.anims.play(`walk-${this.looking}`, true)
        if(!(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)){
            let idle = {right: 0, up: 1, left: 2, down: 3}
            this.player.setFrame(idle[this.looking])
        }

        // Player/Tile interactions
        const tile = this.look()
        if(tile && tile.properties.interact){
            this.interactPrompt.setPosition(this.player.x - this.interactPrompt.width / 2, this.player.y - 40)
            this.interactPrompt.setVisible(true)

            if(Phaser.Input.Keyboard.JustDown(this.keyINTERACT)){
                this.interactions(tile.properties.interact)
            }

        }else{
            this.interactPrompt.setVisible(false)
            this.tempBox.setVisible(false)
            this.dialogue.setVisible(false)
        }

        // Restart
        if(Phaser.Input.Keyboard.JustDown(this.keyRESTART)){
            this.scene.start('menuScene')
            backgroundMusic.stop()
            backgroundMusic.play()
        }
    }

    // Interactions switch
    interactions(prompt){
        switch(prompt){
            case 'Food Truck':
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('The food trucks always hit the spot.')
                this.foodTrucks = 1
                break
            case 'Stage': 
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('We saw so many great shows.')
                this.stage = 1
                break
            case 'Sweet Tea': 
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('I still miss those sweet tea lemonades.')
                this.sweetTea = 1
                break
        }
    }

    // Looking switch
    look(){
        let playerX = this.objectLayer.worldToTileX(this.player.x)
        let playerY = this.objectLayer.worldToTileY(this.player.y)

        switch(this.looking){
            case 'left':
                playerX -= 1
                break
            case 'right':
                playerX += 1
                break
            case 'up':
                playerY -= 1
                break
            case 'down':
                playerY += 1
                break
        }

        return this.objectLayer.getTileAt(playerX, playerY)
    }

}