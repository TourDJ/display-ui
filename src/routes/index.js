import React from 'react'
import { Route, Switch } from 'react-router'
// import Counter from '../components/Counter'
// import NavBar from '../components/NavBar'
import BasicLayout from '../layout/BasicLayout'

const routes = (
  <div>
    <Switch>
      <Route path="/" component={BasicLayout} />
    </Switch>
  </div>
)

export default routes
