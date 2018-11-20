const initialState = []

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORY_ALL_SUCCEEDED':
    	let data = action.payload['data']
      return [
      	...state,
      	...data
      ]

    case 'CATEGORY_ALL_FAILED':
      return action.message

    default:
      return state
  }
}

export default categoryReducer