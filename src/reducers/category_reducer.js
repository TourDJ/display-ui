import { categoryType } from '../actions/actionTypes'
const initialState = []

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryType['CATEGORY_ALL_SUCCEEDED']:
    	let data = action.payload['data']
      return [
      	...state,
      	...data
      ]

    case categoryType['CATEGORY_ALL_FAILED']:
      return action.message

    default:
      return state
  }
}

export default categoryReducer