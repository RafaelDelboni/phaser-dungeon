import {Enum} from 'enumify'

class Actions extends Enum {}
export default Actions.initEnum(
  {
    idle: {
      animation: 'move'
    },
    move: {
      animation: 'move'
    },
    atk: {
      animation: 'atk'
    },
    use: {
      animation: 'use'
    },
    dash: {
      animation: 'move'
    }
  }
)
