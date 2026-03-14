class Letter extends Phaser.Scene{
    constructor(){
        super('letterScene')
    }

    create(){
        
        this.pictureOne = this.add.image(0, this.scale.height, 'pictureOne').setOrigin(0, 0).setScale(.7)

        this.message = this.add.text(this.scale.width - 40, 10, 'As we get older and see eachother less and less, I can always look back on these memories and remember the countless adventures we\'ve had together. As the late great Robert Jordan wrote.\n\nThought is the arrow of time,\nmemory never fades.\n\nLove you brother and I miss you.', {
            font: '24px Arial',
            fill: '#ffffff',
            align: 'left',
            wordWrap: { width: 240 }
        })
        this.message.setOrigin(1, 0)
    }

    update(){

        this.pictureOne.y -= 1
    }




}
