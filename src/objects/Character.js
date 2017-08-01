import Phaser from 'phaser'
import AtlasAnimation from '../helpers/AtlasAnimation'
import actionTypes from '../actions/Types'

const directions = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
}

const setDirection = function () {
  if (Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
    if (this.body.velocity.y <= -0.1) {
      this.direction = this.directions.up
    } else if (this.body.velocity.y >= 0.1) {
      this.direction = this.directions.down
    }
  } else {
    if (this.body.velocity.x <= -0.1) {
      this.direction = this.directions.left
    } else if (this.body.velocity.x >= 0.1) {
      this.direction = this.directions.right
    }
  }
}

const setAction = function () {
  const current = this.actions.find(state => state.isHappening)
  if (current) {
    this.action = current.action
  } else {
    if (!this.body.velocity.isZero()) {
      this.action = actionTypes.move
    } else {
      this.action = actionTypes.idle
    }
  }
}

const setAnimation = function () {
  if (this.body.velocity.isZero() && this.action === actionTypes.idle) {
    this.atlasAnimations.stop({reset: true})
  } else {
    this.atlasAnimations.play(this.action, this.direction)
  }
}

const calcTimers = function () {
  this.actions.map(
    (state) => {
      if (state.isHappening) {
        state.isHappening--
      } else if (state.isCooldown) {
        state.isCooldown--
      }
    }
  )
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

    // default
    this.action = actionTypes.idle
    this.direction = this.directions.down

    this.body.collideWorldBounds = true
    this.body.fixedRotation = true
    this.anchor.setTo(0.5)
    this.name = name
  }

  setActions (actions) {
    this.actions = actions
  }

  setHappeningAction (action, args) {
    const activeActions = this.actions.filter(state => state.isHappening)
    if (!activeActions.length) {
      this.actions
        .filter(state => !state.isHappening && state.action === action)
        .map(state => state.set(args))
    }
  }

  update () {
    setAction.call(this)
    setDirection.call(this)
    setAnimation.call(this)
    calcTimers.call(this)
  }
}
