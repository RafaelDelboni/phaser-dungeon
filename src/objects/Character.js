import Phaser from 'phaser'
import AtlasAnimation from '../helpers/AtlasAnimation'

const actions = {
  move: 'move',
  atk: 'atk',
  use: 'use'
}

const directions = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
}

const setDirection = function () {
  if (Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
    if (this.body.velocity.y <= -1) {
      this.direction = this.directions.up
    } else if (this.body.velocity.y >= 1) {
      this.direction = this.directions.down
    }
  } else {
    if (this.body.velocity.x <= -1) {
      this.direction = this.directions.left
    } else if (this.body.velocity.x >= 1) {
      this.direction = this.directions.right
    }
  }
}

const setAction = function () {
  if (this.isAttacking) {
    this.action = this.actions.atk
  } else {
    this.action = this.actions.move
  }
}

const setAnimation = function () {
  if (this.body.velocity.isZero() && !this.isAttacking) {
    this.atlasAnimations.stop({reset: true})
  } else {
    this.atlasAnimations.play(this.action, this.direction)
  }
}

const calcTimers = function () {
  if (this.isAttacking) {
    this.isAttacking--
  } else if (this.isAttackingCooldown) {
    this.isAttackingCooldown--
  }
}

export default class extends Phaser.Sprite {
  constructor ({
    game,
    x,
    y,
    name,
    firstSprite
  }) {
    super(
      game,
      x,
      y,
      'atlas',
      firstSprite
    )
    game.physics.enable(this, Phaser.Physics.ARCADE)
    this.atlasAnimations = new AtlasAnimation(name, this.animations)
    this.directions = directions
    this.direction = this.directions.down
    this.actions = actions
    this.action = this.actions.move

    this.body.collideWorldBounds = true
    this.body.fixedRotation = true
    this.anchor.setTo(0.5)
    this.name = name

    this.isAttacking = 0
    this.isAttackingCooldown = 0
  }

  update () {
    setDirection.call(this)
    setAction.call(this)
    setAnimation.call(this)
    calcTimers.call(this)
  }
}
