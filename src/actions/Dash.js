import Actions from '../actions'

export default class Dash {
  constructor ({
    character,
    dash
  }) {
    this.character = character
    this.action = Actions.dash
    this.dash = dash
    this.isHappening = 0
    this.isCooldown = 0
  }

  set () {
    if (!this.isCooldown) {
      this.isHappening = this.dash.time
      this.isCooldown = this.dash.cooldown
      this.character.game.physics.arcade.moveToPointer(this.character, this.dash.speed)
    }
  }
}
