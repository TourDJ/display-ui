import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import Photo from '../components/Photo'
import PhotoCreate from '../components/Photo/PhotoCreate'
import PhotoView from '../components/Photo/PhotoView'
import NoMatch from '../components/NoMatch'

const BasicRoute = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/index" component={Home} />
    <Route path="/album/photo/:key(\d+)" component={Photo} />
    <Route path="/album/photo/view/:key(\d+)" component={PhotoView} />
    <Route path="/photo/add" component={PhotoCreate} />
    <Route component={NoMatch} />
  </Switch>
)

export default BasicRoute