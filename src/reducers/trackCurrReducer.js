import { trackCurrType } from '../actions/actionTypes'

const initState = ''

const trackCurrReducer = (state = initState, action) => {
  let newState

  switch(action.type) {

    case trackCurrType['TRACK_CURR_SET']:
      newState = action.payload
      return newState

    default:
      return state
  }
}

export default trackCurrReducer