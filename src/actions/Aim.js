/* globals __DEV__ */

import Phaser from 'phaser'

const getSight = function (
  range = 20,
  height = 20,
  width = 10
) {
  const sight = __DEV__
    ? this.game.add.sprite(range, 0, 'atlas', 'mushroom2')
    : this.game.add.sprite(range, 0)

  sight.anchor.setTo(0.5)
  sight.height = height
  sight.width = width

  this.game.physics.enable(sight, Phaser.Physics.ARCADE)

  return sight
}

const overlapHandler = function (_player, _enemy) {
  console.log(_player, _enemy)
}

export default class Aim extends Phaser.Group {
  constructor ({
    game,
    character
  }) {
    super(
      game,
      character,
      `aim.${character.name}`
    )
    this.game = game
    this.character = character
    this.add(getSight.call(this))
  }

  set (range, height, width) {
    this.removeAll()
    this.add(getSight.call(this, range, height, width))
  }

  get () {
    return this.getChildAt(0)
  }

  update () {
    this.game.physics.arcade.overlap(
      this.get(), this.game.currentStage, overlapHandler, null, this
    )
  }
}
