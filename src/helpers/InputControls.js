import Phaser from 'phaser'

const setMovementByDirection = function (character, speed) {
  if (character.direction === character.directions.left) {
    character.body.velocity.x = -1
  } else if (character.direction === character.directions.right) {
    character.body.velocity.x = 1
  } else {
    character.body.velocity.x = 0
  }
  if (character.direction === character.directions.up) {
    character.body.velocity.y = -1
  } else if (character.direction === character.directions.down) {
    character.body.velocity.y = 1
  } else {
    character.body.velocity.y = 0
  }
  character.body.velocity.x *= speed
  character.body.velocity.y *= speed
}

const setAttack = function () {
  const attack = this.character.getAttack()
  this.character.isAttacking = attack.time
  setMovementByDirection(this.character, attack.speed)
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

    this.keys = {
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      attack: this.game.input.keyboard.addKey(Phaser.Keyboard.O)
    }

    this.pythInverse = 1 / Math.SQRT2
  }

  update () {
    if (this.character.isAttacking) return

    this.keys.attack.onDown.add(setAttack, this)
    setMovement.call(this)
  }
}
