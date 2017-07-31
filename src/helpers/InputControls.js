/* globals __DEV__ */
import Phaser from 'phaser'
import actionTypes from '../actions/types'

const setAimSystem = function (range = 20, height = 20, width = 10) {
  this.aim.removeAll()

  const sight = __DEV__
    ? this.game.add.sprite(range, 0, 'atlas', 'mushroom2')
    : this.game.add.sprite(range, 0)

  sight.anchor.setTo(0.5)
  sight.height = height
  sight.width = width

  this.aim.add(sight)
}

const setMovement = function () {
  if (this.keys.left.isDown) {
    this.character.body.velocity.x = -1
  } else if (this.keys.right.isDown) {
    this.character.body.velocity.x = 1
  } else {
    this.character.body.velocity.x = 0
  }

  if (this.keys.up.isDown) {
    this.character.body.velocity.y = -1
  } else if (this.keys.down.isDown) {
    this.character.body.velocity.y = 1
  } else {
    this.character.body.velocity.y = 0
  }

  let currentSpeed = this.character.speed

  let targetSpeed =
      (this.character.body.velocity.x !== 0 && this.character.body.velocity.y !== 0)
        ? currentSpeed * this.pythInverse
        : currentSpeed

  this.character.body.velocity.x *= targetSpeed
  this.character.body.velocity.y *= targetSpeed
}

export default class InputControls {
  constructor (character) {
    this.character = character
    this.game = character.game

    // Prevent directions and mouse key events bubbling up to browser
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.A,
      Phaser.Keyboard.D,
      Phaser.Keyboard.W,
      Phaser.Keyboard.S,
      Phaser.Keyboard.O
    ])

    this.game.input.mouse.capture = true

    this.keys = {
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      attack: this.game.input.activePointer.leftButton
    }

    this.pythInverse = 1 / Math.SQRT2

    this.aim = this.game.add.group()
    this.character.addChild(this.aim)
    setAimSystem.call(this)
  }

  setAim (range, height, width) {
    setAimSystem.call(this, range, height, width)
  }

  update () {
    this.aim.rotation = this.game.physics.arcade.angleToPointer(this.character)

    if (this.character.action !== actionTypes.move) return

    this.keys.attack.onDown.add(this.character.setHappeningAction.bind(this.character, actionTypes.atk))
    setMovement.call(this)
  }
}
