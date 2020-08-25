import { Keys } from '~/consts/index'
export default class TransitionTo extends Phaser.Scene {
  constructor() {
    super(Keys.TransitionToScene)
  }

  create(data: { fadeIn: boolean, shake:boolean }) {
    this.add.text(300, 200, 'test', {
      fontSize: 38
    })
    if(data.fadeIn){
      this.cameras.main.fadeIn(1000, 0, 0, 0)
    }
    if(data.shake){
      this.cameras.main.flash(1000)
    }

  }
}
