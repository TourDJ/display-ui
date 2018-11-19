const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'CATEGORY_ALL_SUCCEEDED':
    	console.log(state)
      return action.payload

    case 'CATEGORY_ALL_FAILED':
      return action.message

    default:
      return state
  }
}

export default categoryReducer