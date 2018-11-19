const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
			   //  {
			   //  	this.state.panes.map(pane => (
						// 	<TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)
			   //  	) 
			  	// }

export default counterReducer
