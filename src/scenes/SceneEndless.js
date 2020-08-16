import Phaser from 'phaser'

export default class SceneEndless extends Phaser.Scene
{
    constructor ()
    {
        super('scene-endless')

        this.x = 170
        this.y = 200
        this.score = 0
        this.answer = ""
    }

    init(data)
    {
        this.level = data.level
    }

    create ()
    {
        // change music
        if(this.level == 1)
        {
            this.changeMusic()
        }        

        //create a background
        this.cameras.main.setBackgroundColor(0x6699ff)

        /* create tombol / button */
        let markers = [
            { name: '0' }
        ]

        for (let i=0; i < markers.length; i++)
        {
            this.makeButton.call(this, markers[i].name, i)
        }

        this.add.text(270, 20, 'Aksara Jawa', { fontFamily: 'Courier', fontSize: 42, color: '#ffffff', align: 'center' })
        this.add.text(330, 70, '( Endless )', { fontFamily: 'Courier', fontSize: 20, color: '#ffffff', align: 'center' })

        // Score
        this.scoreLabel = this.add.text(700, 20, `Score : ${this.score}`, { fontFamily: 'Arial', fontSize: 18, color: '#ffffff' })

        //create exercise
        var x = this.x
        var y = this.y
        var aksara = ['ha', 'na', 'ca', 'ra', 'ka', 'da', 'ta', 'sa', 'wa', 'la', 'pa', 'dha', 'ja', 'ya', 'nya', 'ma', 'ga', 'ba', 'tha', 'nga']
        var soal = []
        for(let a = 0; a < 5; a++)
        {
            let c = aksara[Math.floor(Math.random() * aksara.length)]
            soal.push(c)

            this.add.image(x, y, 'aksara', c).setScale(2)
            x += 100
        }
        //console.log(soal.join(" "))
        let soalcopy = soal.map(x => x)
        soalcopy.fill('_')

        // View Search word
        let viewsoal = this.add.text(350, 270, soalcopy.join(" "), { fontFamily: 'Courier', fontSize: 20, color: '#ffffff', align: 'center' })

        //information
        this.add.text(190, 340, 'Click the button bellow to answer', { fontFamily: 'Courier', fontSize: 20, color: '#ffffff', align: 'center' })

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

        //submit button
        let buttonSubmit = this.add.image(400, 530, 'submit').setDisplaySize(80, 30).setInteractive();
        buttonSubmit.setData('index', 1)

        //exec
        var detecxsoal = 0
        this.input.on('gameobjectdown', function (pointer, button)
        {
            if(button.getData('index') === 0)
            {
                this.scene.stop().start('scene-depan')
                let sceneB = this.scene.get('scene-musik')
                sceneB.play_intro()
            }
            else if(button.getData('index') === 1)
            {
                if(soalcopy.join(" ") == soal.join(" "))
                {
                    this.updateScore()
                }                
                this.scene.restart({ "level": (this.level + 1) })
            }
            else
            {
                this.sound.playAudioSprite('sfx_aksara_dasar', button.name)

                if(detecxsoal < soal.length)
                {
                    soalcopy[detecxsoal] = button.name
                    viewsoal.setText(soalcopy.join(" "))

                    detecxsoal += 1
                }
            }

        }, this)        
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

    makeButton(name, index)
    {        
        let button = this.add.image(30, 30, 'back').setScale(0.25, 0.25).setInteractive()
        button.setData('index', index)        
    }

    makeAksara(name, x, y)
    {
        var button = this.add.image(x, y, 'button', 1).setInteractive();
        button.name = name;
        button.setScale(0.75, 1);

        var text = this.add.bitmapText(x - 40, y - 8, 'nokia', name, 16);
        text.x += (button.width - text.width) / 2;
    }

    updateScore()
    {
        this.score += 10
        this.scoreLabel.text = `${this.score}`
    }

    changeMusic()
    {
        let sceneB = this.scene.get('scene-musik')
        sceneB.play_language()
    }
}
