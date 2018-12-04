import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import Photo from '../components/Photo'
import CreatePhotoForm from '../components/Photo/CreatePhotoForm'
import ViewPhoto from '../components/Photo/ViewPhoto'
import NoMatch from '../components/NoMatch'

const BasicRoute = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/index" component={Home} />
    <Route path="/photo/:key(\d+)" component={Photo} />
    <Route path="/photo/add" component={CreatePhotoForm} />
    <Route path="/photo/view/:key(\d+)" component={ViewPhoto} />
    <Route component={NoMatch} />
  </Switch>
)

export default BasicRoute