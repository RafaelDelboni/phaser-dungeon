import types from '../actions/Types'

export default class Attacks {
  constructor ({
    character,
    attacks
  }) {
    this.character = character
    this.action = types.atk
    this.attacks = attacks
    this.current = 0
    this.isHappening = 0
    this.isCooldown = 0
  }

  set (type) {
    if (!this.isCooldown) {
      const attack = this.get(type)
      this.isHappening = attack.time
      this.isCooldown = attack.cooldown
      this.character.game.physics.arcade.moveToPointer(this.character, attack.speed)
    }
  }

  get (type) {
    // TODO: attack selection based on type or sequence
    return this.attacks[0]
  }
}
