import locale from './locale'

//Crumb hierachy definition setting, it's used for generate bread crumbs.
//The data structure defined below demstrate
const crumbs = {
  "/": {
    serial: 1,
    level: 1,
    name: locale['app.crumb.index'],
    path: "/",
    visit: false,
  },

  "/album/add": {
    serial: 2,
    level: 2,
    name: locale['app.crumb.album.add'],
    path: "/album/add",
    prev: "/",
    visit: false,
  },

  "/album/edit": {
    serial: 3,
    level: 2,
    name: locale['app.crumb.album.edit'],
    path: "/album/edit",
    prev: "/",
    visit: false,
  },

  "/album/photo/view": {
    serial: 4,
    level: 2,
    name: locale['app.crumb.photo.view'],
    path: "/album/photo/view",
    prev: "/",
    visit: false,
    dynamic: true,
  },

  "/album/photo": {
    serial: 5,
    level: 2,
    name: locale['app.crumb.photo.manage'],
    path: "/album/photo",
    prev: "/",
    visit: false,
    dynamic: true,
  },

  "/photo/add": {
    serial: 6,
    level: 3,
    name: locale['app.crumb.photo.add'],
    path: "/photo/add",
    prev: "/album/photo",
    visit: false,
  },

  "/photo/add/batch": {
    serial: 7,
    level: 3,
    name: locale['app.crumb.photo.add.batch'],
    path: "/photo/add/batch",
    prev: "/album/photo",
    visit: false,
  },

  "/photo/edit": {
    serial: 8,
    level: 3,
    name: locale['app.crumb.photo.edit'],
    path: "/photo/edit",
    prev: "/album/photo",
    visit: false,
  }
}

export default crumbs