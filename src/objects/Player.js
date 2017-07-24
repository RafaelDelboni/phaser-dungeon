import InputControls from '../helpers/InputControls'
import Character from './Character'

const addMoveAnimations = function () {
  Object.keys(this.directions).map(
    (direction) => this.atlasAnimations.add({
      action: this.actions.move,
      direction,
      speed: 8
    })
  )
}

const addAtkAnimations = function () {
  Object.keys(this.directions).map(
    (direction) => this.atlasAnimations.add({
      action: this.actions.atk,
      direction,
      speed: 13
    })
  )
}

export default class extends Character {
  constructor ({
    game, x, y, name
  }) {
    super({
      game,
      x,
      y,
      name,
      firstSprite: `${name}-move-down-1`
    })
    this.controls = new InputControls(this)
    this.speed = 140

    addMoveAnimations.call(this)
    addAtkAnimations.call(this)
  }

  getAttack () {
    return {type: 'normal', time: 24, speed: 13}
  }

  update () {
    super.update()
    this.controls.update()
  }
}
