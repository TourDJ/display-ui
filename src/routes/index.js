import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import Hello from '../components/Hello'
import Counter from '../components/Counter'
import NoMatch from '../components/NoMatch'
import NavBar from '../components/NavBar'
import BasicLayout from '../layout/BasicLayout'

const routes = (
  <div>
    <BasicLayout>
	    <Switch>
	      <Route exact path="/" component={Home} />
	      <Route path="/hello" component={Hello} />
	      <Route path="/counter" component={Counter} />
	      <Route component={NoMatch} />
	    </Switch>
    </BasicLayout>
  </div>
)

export default routes
