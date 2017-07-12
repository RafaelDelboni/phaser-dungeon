import Phaser from 'phaser'
import WebFont from 'webfontloader'

const scaleGameCentralize = function () {
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  this.game.scale.setMinMax(480, 270, 1920, 1080)
  this.game.scale.forceLandscape = true
  this.game.scale.pageAlignHorizontally = true
  this.game.scale.pageAlignVertically = true
}

const pixelCrispScaleRender = function () {
  this.game.renderer.renderSession.roundPixels = true
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
}

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#222222'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    scaleGameCentralize.call(this)
    pixelCrispScaleRender.call(this)

    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      'loading fonts',
      { font: '16px Arial', fill: '#dddddd', align: 'center' }
    )
    text.anchor.setTo(0.5, 0.5)

    this.load.atlas('preload', './dist/preload.png', './dist/preload.json')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
