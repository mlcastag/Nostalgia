class Letter extends Phaser.Scene{
    constructor(){
        super('letterScene')
    }

    create(){
        
        this.pictureOne = this.add.image(0, this.scale.height, 'pictureOne').setOrigin(0, 0).setScale(.7)

        this.message = this.add.text(this.scale.width - 80, 10, 'Thought is the arrow of time,\nmemory never fades.', {
            font: '24px Arial',
            fill: '#ffffff',
            align: 'left',
            wordWrap: { width: 200 }
        })
        this.message.setOrigin(1, 0)
    }

    update(){

        this.pictureOne.y -= 1
    }




}
