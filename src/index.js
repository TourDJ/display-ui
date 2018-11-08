import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter, ConnectedRouter } from 'connected-react-router'
import IndexRouter from './viewer/index'
import reducer from './reducer'

const history = createBrowserHistory()

const store = createStore(
	reducer(history),
	compose(
		applyMiddleware(
			routerMiddleware(history),
		),
	),
)


const App = () => (
	<AppContainer>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				{ IndexRouter }
			</ConnectedRouter>
		</Provider>
	</AppContainer>
)

render(
	<App />,
	document.getElementById('root')
)