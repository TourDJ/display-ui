import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import Picture from '../components/Picture'
import NoMatch from '../components/NoMatch'

const BasicRoute = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/index" component={Home} />
    <Route path="/picture/:key(\d+)" component={Picture} />
    <Route component={NoMatch} />
  </Switch>
)

export default BasicRoute