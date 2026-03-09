class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    init(){
        this.speed = 100
    }

    create(){

        const map = this.add.tilemap('concert')
        const tileset = map.addTilesetImage('tileset','tiles')
        const floorLayer = map.createLayer('floorLayer', tileset, 0 , 0)
        const objectLayer = map.createLayer('objectLayer', tileset, 0 , 0)
        
        this.player = this.physics.add.sprite(705, 550, 'player', 3)
        this.player.body.setSize(this.player.width, 48)
        this.player.body.setOffset(0, this.player.height - 48)
        this.player.body.setCollideWorldBounds(true)
        

        objectLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, objectLayer)

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(){

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
    }
}