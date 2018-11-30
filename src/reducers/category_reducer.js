import { categoryType } from '../actions/actionTypes'
const initialState = []

const categoryReducer = (state = initialState, action) => {
  let data

  switch (action.type) {
    case categoryType['CATEGORY_ALL_SUCCEEDED']:
    	data = action.payload && action.payload['data']
      return [
      	...state,
      	...data
      ]

    case categoryType['CATEGORY_ALL_FAILED']:
      console.log(action.message)
      return state

    case categoryType['CATEGORY_SAVE_SUCCEEDED']:
      data = action.payload
      return [
        ...state,
        ...data
      ]

    case categoryType['CATEGORY_SAVE_FAILED']:
      console.log(action.message)
      return state

    default:
      return state
  }
}

export default categoryReducer