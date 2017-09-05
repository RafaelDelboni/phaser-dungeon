import {Enum} from 'enumify'

class Types extends Enum {}
export default Types.initEnum(
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
