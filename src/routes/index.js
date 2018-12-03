import React from 'react'
import { Route, Switch } from 'react-router'
import BasicLayout from '../layout/BasicLayout'

const routes = (
  <div>
    <Switch>
      <Route path="/" component={BasicLayout} />
    </Switch>
  </div>
)

export default routes
