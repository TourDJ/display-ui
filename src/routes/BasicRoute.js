import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import AlbumCreate from '../components/Album/AlbumCreate'
import AlbumEdit from '../components/Album/AlbumEdit'
import Photo from '../components/Photo'
import PhotoView from '../components/Photo/PhotoView'
import PhotoCreate from '../components/Photo/PhotoCreate'
import PhotoEdit from '../components/Photo/PhotoEdit'
import NoMatch from '../components/NoMatch'

const BasicRoute = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/index" component={Home} />
    <Route path="/album/add" component={AlbumCreate} />
    <Route path="/album/edit" component={AlbumEdit} />
    <Route path="/album/photo/:key(\d+)" component={Photo} />
    <Route path="/album/photo/view/:key(\d+)" component={PhotoView} />
    <Route path="/photo/add" component={PhotoCreate} />
    <Route path="/photo/edit" component={PhotoEdit} />
    <Route component={NoMatch} />
  </Switch>
)

export default BasicRoute