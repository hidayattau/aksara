import Phaser from 'phaser'

export default class SceneAksara extends Phaser.Scene
{
    constructor ()
    {
        super('scene-aksara')

        this.x = 170
        this.y = 200
        this.maxExercise = 10
    }

    init(data)
    {
        this.level = data.level
    }

    create ()
    {
        // change music
        this.changeMusic()

        //create a background
        this.cameras.main.setBackgroundColor(0x6699ff)

        this.add.text(270, 20, 'Aksara Jawa', { fontFamily: 'Courier', fontSize: 42, color: '#ffffff', align: 'center' })
        this.add.text(330, 70, '( Endless )', { fontFamily: 'Courier', fontSize: 20, color: '#ffffff', align: 'center' })
        //this.add.text(330, 70, '( Exercise )', { fontFamily: 'Courier', fontSize: 20, color: '#ffffff', align: 'center' })

        //create exercise
        var x = this.x
        var y = this.y
        var aksara = ['ha', 'na', 'ca', 'ra', 'ka']
        var soal = []
        for(let a = 0; a < 5; a++)
        {
            //soal[a] = []
            //for(let b = 0; b < 5; b++)
            //{
                let c = aksara[Math.floor(Math.random() * aksara.length)]
                soal.push(c)

                this.add.image(x, y, 'aksara', c).setScale(2)
                x += 100
            //}

            //x = 100
            //y += 45
        }

        //information
        //this.add.text(135, 340, 'Click the button bellow from left to right', { fontFamily: 'Courier', fontSize: 20, color: '#ffffff', align: 'center' })
        this.add.text(190, 340, 'Click the button bellow to answer', { fontFamily: 'Courier', fontSize: 20, color: '#ffffff', align: 'center' })

        //console.log(soal)

        var spritemap = this.cache.json.get('sfx_aksara_dasar').spritemap

        var i = 0;
        for (var spriteName in spritemap)
        {
            if (!spritemap.hasOwnProperty(spriteName))
            {
                continue;
            }
            
            if(i < 10)
            {
                this.makeAksara.call(this, spriteName, 80 + i * 70, 410);
            }
            else
            {
                this.makeAksara.call(this, spriteName, 80 + (i - 10) * 70, 460);
            }

            i++;
        }

        //submit button\
        let buttonSubmit = this.add.image(400, 530, 'submit').setDisplaySize(80, 30).setInteractive();
        buttonSubmit.setData('index', 0)

        //exec
        this.input.on('gameobjectdown', function (pointer, button)
        {
            if(button.getData('index') === 0)
            {
                console.log('submit')
            }
            else
            {
                this.sound.playAudioSprite('sfx_aksara_dasar', button.name)
            }

        }, this)

        //console.log(spritemap)

        
    }

    shuffle(arra1) {
        var ctr = arra1.length, temp, index

        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr)
            // Decrease ctr by 1
            ctr--
            // And swap the last element with it
            temp = arra1[ctr]
            arra1[ctr] = arra1[index]
            arra1[index] = temp
        }

        return arra1
    }

    makeAksara(name, x, y)
    {
        var button = this.add.image(x, y, 'button', 1).setInteractive();
        button.name = name;
        button.setScale(0.75, 1);

        var text = this.add.bitmapText(x - 40, y - 8, 'nokia', name, 16);
        text.x += (button.width - text.width) / 2;
    }

    changeMusic()
    {
        let sceneB = this.scene.get('scene-musik')
        sceneB.play_language()
    }
}
