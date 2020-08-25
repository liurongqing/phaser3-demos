import { Keys } from '~/consts/index'
export default class Typewriter extends Phaser.Scene {
  label: Phaser.GameObjects.Text
  constructor() {
    super(Keys.TypewriterScene)
  }

  create() {

    this.label = this.add.text(100, 100, '')
      .setWordWrapWidth(100)
    this.typewriteTextWrapper('Hello, world!')
    // this.typewriteText('Hello, world!')
  }

  typewriteText(text: string) {
    const length = text.length
    let i = 0
    // 每隔 200 毫秒执行一次
    this.time.addEvent({
      callback: () => {
        this.label.text += text[i]
        ++i
      },
      repeat: length - 1,
      delay: 200
    })
  }

  typewriteTextWrapper(text: string) {
    // 以空格分隔
    const lines = this.label.getWrappedText(text)
    const wrappedText = lines.join('\n')
    this.typewriteText(wrappedText)
  }
}
