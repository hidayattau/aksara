import Phaser from 'phaser'

import Preload from './scenes/Preload'

import SceneDepan from './scenes/SceneDepan'
import SceneLevel from './scenes/SceneLevel'
import ScenePengaturan from './scenes/ScenePengaturan'
import SceneMusik from './scenes/SceneMusik'

import SceneAksara from './scenes/SceneAksara'
import SceneList from './scenes/SceneList'
import SceneEndless from './scenes/SceneEndless'

const config = {
	type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    pixelArt: true,
    audio: {
        disableWebAudio: true
    },
	scene: [
        Preload, SceneMusik, SceneDepan, SceneLevel, ScenePengaturan,
        SceneAksara, SceneList, SceneEndless
    ],
    backgroundColor: '#000000',
    title: 'aksara',
    version: '1.0',
    url: 'hackathon.unindora.com/aksara'
}

export default new Phaser.Game(config)
