import Phaser from 'phaser'

export default class SceneLevel extends Phaser.Scene
{
    constructor ()
    {
        super('scene-level')
    }

    create ()
    {
        //create a background
        this.cameras.main.setBackgroundColor(0x6699ff)

        this.add.text(320, 20, 'Level', { fontFamily: 'Courier', fontSize: 42, color: '#ffffff', align: 'center' })

        /* create tombol / button */
        let markers = [
            { name: '0' },
            { name: '1' },
            { name: '2' },
            { name: '3' },
            { name: '4' },
            { name: '5' },
            { name: '6' },
            { name: '7' },
            { name: '8' },
            { name: '9' },
            { name: '10' },
            { name: '11' },
            { name: '12' },
            { name: '13' },
            { name: '14' },
            { name: '15' }
        ]

        for (let i=0; i < markers.length; i++)
        {
            this.makeButton.call(this, markers[i].name, i)
        }

        this.input.on('gameobjectdown', function (pointer, button)
        {
            var index = button.getData('index')

            if(index === 0)
            {
                this.scene.stop().start('scene-depan')
            }
            else
            {
                this.scene.stop().start('scene-aksara', { level: index })
            }

        }, this)
    }

    makeButton(name, index)
    {
        if(index < 1)
        {
            let button = this.add.image(100, 300, 'back').setScale(0.5, 0.5).setInteractive()
            button.setData('index', index)
        }
        else if(index > 0 && index < 6)
        {
            let button = this.add.rectangle(100 + index*100, 200, 75, 75, 0x6666ff).setInteractive()
            button.setData('index', index)

            let text = this.add.bitmapText(button.x - 10, button.y - 15, 'nokia', name, 32)
        }
        else if(index > 5 && index < 11)
        {
            let button = this.add.rectangle(100 + (index-5)*100, 300, 75, 75, 0x6666ff).setInteractive()
            button.setData('index', index)

            let text = this.add.bitmapText(button.x - 10, button.y - 15, 'nokia', name, 32)
        }
        else if(index > 10 && index < 16)
        {
            let button = this.add.rectangle(100 + (index-10)*100, 400, 75, 75, 0x6666ff).setInteractive()
            button.setData('index', index)

            let text = this.add.bitmapText(button.x - 10, button.y - 15, 'nokia', name, 32)
        }
    }
}
