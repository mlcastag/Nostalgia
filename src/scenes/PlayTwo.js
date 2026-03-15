class PlayTwo extends Phaser.Scene{
    constructor(){
        super('playTwoScene')
    }

    init(){
        this.mattTalk = 0
        this.view = 0
        this.rv = 0
    }

    create(){

        // Add map
        const map = this.add.tilemap('bigSur')
        const tileset = map.addTilesetImage('tileset', 'tiles')
        const belowFloor = map.createLayer('belowFloor', tileset, 0, 0)
        const floorLayer = map.createLayer('floorLayer', tileset, 0, 0)
        this.objectLayer = map.createLayer('objectLayer', tileset, 0, 0)

        // Keys
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // Add NPC
        this.matt = this.physics.add.sprite(this.scale.width - 750, this.scale.height / 3, 'matt', 3)
        this.matt.body.setSize(this.width, 48)
        this.matt.setImmovable(true)
        this.matt.body.setOffset(0, this.matt.height - 48)
        
        this.mattZone = this.add.zone(this.matt.x, this.matt.y + 5, this.matt.width + 10, this.matt.height - 1)
        this.physics.world.enable(this.mattZone)
        this.mattZone.body.setImmovable(true)
        this.mattZone.setDataEnabled()
        this.mattZone.data.set('interact', 'Matt')

        // Add player
        this.player = new Player(this, 500, 550, this.cursors, this.objectLayer)



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
        this.physics.add.collider(this.player, this.matt)
    }

    update(){

        this.player.update()

        // Continue
        if(Phaser.Input.Keyboard.JustDown(this.keySTART) && this.view == 1 && this.mattTalk == 1 && this.rv == 1/* && other conditions */){
            this.scene.start('letterScene')
        }

        if(this.view == 1 && this.mattTalk == 1 && this.rv == 1/* && other conditions */){
            this.leavePrompt.setVisible(true)
            this.leavePrompt.setPosition(this.player.x - 60, this.player.y - 55)
        }

        // Player/Tile interactions
        const tile = this.player.look()
        const inDaZone = this.physics.overlap(this.player, this.mattZone)
        if(tile && tile.properties.interact || inDaZone){
            this.interactPrompt.setPosition(this.player.x - this.interactPrompt.width / 2, this.player.y - 40)
            this.interactPrompt.setVisible(true)

            if(tile && tile.properties.interact && Phaser.Input.Keyboard.JustDown(this.keyINTERACT)){
                this.interactions(tile.properties.interact)
            }

            if(inDaZone && Phaser.Input.Keyboard.JustDown(this.keyINTERACT)){
                this.interactions(this.mattZone.data.get('interact'))
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

    interactions(prompt){
        switch(prompt){
            case 'View':
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('I\'ll never forget those views.')
                this.view = 1
                break
            case 'Matt': 
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('It\'s nutty out here.')
                this.mattTalk = 1
                break
            case 'RV': 
                this.tempBox.setVisible(true)
                this.dialogue.setVisible(true)
                this.dialogue.setText('We\'ve been on so many great trips.')
                this.rv = 1
                break
        }
    }

}