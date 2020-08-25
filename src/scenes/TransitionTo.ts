import { Keys } from '~/consts/index'
export default class TransitionTo extends Phaser.Scene {
  constructor() {
    super(Keys.TransitionToScene)
  }

  create(data: { fadeIn: boolean }) {
    const { width, height } = this.scale

    this.add.text(width * 0.5, height * 0.5, 'scene transition 2', {
      fontSize: 48
    }).setOrigin(0.5)

    if (data.fadeIn) {
      this.cameras.main.fadeIn(1000, 0, 0, 0)
    }

  }
}
