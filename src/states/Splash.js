import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'preload', 'loader-bg'
    )
    this.loaderBar = this.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'preload', 'loader-bar'
    )
    centerGameObjects([this.loaderBg, this.loaderBar])
    this.load.setPreloadSprite(this.loaderBar)

    // load assets
    this.load.atlas('atlas', './dist/atlas.png', './dist/atlas.json')
  }

  create () {
    this.state.start('Game')
  }
}
