import InputControls from '../helpers/InputControls'
import Character from './Character'
import Attacks from '../actions/Attacks'
import actionTypes from '../actions/types'

const addMoveAnimations = function () {
  Object.keys(this.directions).map(
    (direction) => this.atlasAnimations.add({
      action: actionTypes.move,
      direction,
      speed: 8
    })
  )
}

const addAtkAnimations = function () {
  Object.keys(this.directions).map(
    (direction) => this.atlasAnimations.add({
      action: actionTypes.atk,
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

    this.setActions([
      new Attacks({
        character: this,
        attacks: [{id: 0, type: 'normal', time: 24, speed: 13, cooldown: 26}]
      })
    ])

    this.controls = new InputControls(this)
    this.speed = 140

    addMoveAnimations.call(this)
    addAtkAnimations.call(this)
  }

  update () {
    super.update()
    this.controls.update()
  }
}
