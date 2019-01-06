import locale from './locale'

//Crumb hierachy definition
const crumbDefine = {
  "/": {
    serial: 1,
    level: 1,
    name: "首页",
    path: "/",
    visit: false,
  },

  "/album/add": {
    serial: 2,
    level: 2,
    name: "添加相册",
    path: "/album/add",
    prev: "/",
    visit: false,
  },

  "/album/edit": {
    serial: 3,
    level: 2,
    name: "相册编辑",
    path: "/album/edit",
    prev: "/",
    visit: false,
  },

  "/album/photo/view": {
    serial: 4,
    level: 2,
    name: "照片欣赏",
    path: "/album/photo/view",
    prev: "/",
    visit: false,
    dynamic: true,
  },

  "/album/photo": {
    serial: 5,
    level: 2,
    name: "照片管理",
    path: "/album/photo",
    prev: "/",
    visit: false,
    dynamic: true,
  },

  "/photo/add": {
    serial: 6,
    level: 3,
    name: "添加照片",
    path: "/photo/add",
    prev: "/album/photo",
    visit: false,
  },

  "/photo/add/batch": {
    serial: 7,
    level: 3,
    name: "批量添加照片",
    path: "/photo/add/batch",
    prev: "/album/photo",
    visit: false,
  },

  "/photo/edit": {
    serial: 8,
    level: 3,
    name: "照片编辑",
    path: "/photo/edit",
    prev: "/album/photo",
    visit: false,
  }
}

export default crumbDefine