class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }

    preload(){
        
        this.load.path = './assets/'

        this.load.image('pictureOne', 'pictureOne.jpg')
        this.load.bitmapFont('highSchool', 'Highschool Nostalgia.png', 'Highschool Nostalgia.xml')
        this.load.image('tiles', 'tileset.png')
        this.load.tilemapTiledJSON('concert', 'concert.json')

        this.load.spritesheet('player', 'player.png', {
            frameWidth: 32,
            frameHeight: 64
        })

        this.load.audio('postcards', 'postcardsFromHell.wav')

    }

    create(){

        this.add.bitmapText(this.scale.width / 2, this.scale.height / 5, 'highSchool', 'To: Ivan', 64).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 3, 'highSchool', 'From: Matt', 64).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 2, 'highSchool', 'Use the arrow keys to move', 32).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 1.8, 'highSchool', 'Press \'E\' to interact', 32).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 1.5, 'highSchool', 'Press \'SPACE\' to start', 32).setOrigin(0.5)
        this.add.bitmapText(this.scale.width / 2, this.scale.height / 1.2, 'highSchool', 'Press \'C\' for credits', 32).setOrigin(0.5)
    
        this.backgroundMusic = this.sound.add('postcards', {
            volume: 0.1,
            loop: true
        })
        this.backgroundMusic.play()

        this.keyINTERACT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    

    }

    update(){
        
        if(Phaser.Input.Keyboard.JustDown(this.keySTART)){
            this.scene.start('playScene')
        }
            
        
        /*
        if(Phaser.Input.Keyboard.JustDown(this.keyCREDITS)){
            this.scene.start('')
        }
            */
    }

}