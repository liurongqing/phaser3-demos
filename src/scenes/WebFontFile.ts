import { Keys } from '~/consts/index'
import WebFontFile from '~/controllers/WebFontFile'

export default class WebFontFileScene extends Phaser.Scene {
  constructor() {
    super(Keys.WebFontFileScene)
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'))

    this.load.addFile(new WebFontFile(this.load, 'shojumaru', 'adobe-edge'))
  }

  create() {
    this.add.text(400, 300, "hello world", {
      fontFamily: '"Press Start 2P"',
      fontSize: 50
    })
      .setOrigin(0.5)

    this.add.text(400, 400, "hello world", {
      fontFamily: 'shojumaru',
      fontSize: 50
    })
      .setOrigin(0.5)
  }
}
