import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import AlbumCreate from '../components/Album/AlbumCreate'
import AlbumEdit from '../components/Album/AlbumEdit'
import Photo from '../components/Photo'
import PhotoView from '../components/Photo/PhotoView'
import PhotoCreate from '../components/Photo/PhotoCreate'
import PhotoBatch from '../components/Photo/PhotoBatch'
import PhotoEdit from '../components/Photo/PhotoEdit'
import NoMatch from '../components/NoMatch'

const BasicRoute = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/album/add" component={AlbumCreate} />
    <Route exact path="/album/edit" component={AlbumEdit} />
    <Route exact path="/album/photo/:key(\d+)" component={Photo} />
    <Route exact path="/album/photo/view/:key(\d+)" component={PhotoView} />
    <Route exact path="/photo/add" component={PhotoCreate} />
    <Route exact path="/photo/add/batch" component={PhotoBatch} />
    <Route exact path="/photo/edit" component={PhotoEdit} />
    <Route component={NoMatch} />
  </Switch>
)

export default BasicRoute