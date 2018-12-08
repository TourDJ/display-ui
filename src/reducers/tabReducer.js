import { tabType } from '../actions/actionTypes'

const tabReducer = (state = '', action) => {

  switch (action.type) {
    case tabType['TAB_KEY']:
      return action.key

    default:
      return state    
  }
}

export default tabReducer