import Phaser from 'phaser'
const animationSpeed = 6
const animationLoop = true

const addAnimation = function (spriteName) {
  this.animations.add(
    spriteName,
    Phaser.Animation.generateFrameNames(`${spriteName}-`, 1, 5),
    animationSpeed,
    animationLoop
  )
}

const addAllAnimations = function () {
  const addAnim = addAnimation.bind(this)
  addAnim('knight-move-up')
  addAnim('knight-move-down')
  addAnim('knight-move-left')
  addAnim('knight-move-right')
  addAnim('knight-atk-up')
  addAnim('knight-atk-down')
  addAnim('knight-atk-left')
  addAnim('knight-atk-right')
  addAnim('knight-use-up')
  addAnim('knight-use-down')
  addAnim('knight-use-left')
  addAnim('knight-use-right')
}

export default class extends Phaser.Sprite {
  constructor ({
    game, x, y
  }) {
    super(game, x, y, 'atlas', 'knight-move-down-1')
    addAllAnimations.call(this)
  }

  update () {
  }
}
