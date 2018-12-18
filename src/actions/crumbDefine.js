
//Crumb hierachy definition
const crumbDefine = {
  "/": {
    key: 1,
    level: 1,
    name: "首页",
    path: "/",
    active: true,
  },

  "/album/add": {
    key: 2,
    level: 2,
    name: "添加相册",
    path: "/album/add",
    prev: "/",
    active: false,
  },

  "/album/edit": {
    key: 3,
    level: 2,
    name: "相册编辑",
    path: "/album/edit",
    prev: "/",
    active: false,
  },

  "/album/photo/view": {
    key: 4,
    level: 2,
    name: "照片欣赏",
    path: "/album/photo/view",
    prev: "/",
    active: false,
  },

  "/album/photo": {
    key: 5,
    level: 2,
    name: "照片管理",
    path: "/album/photo",
    prev: "/",
    active: false,
  },

  "/photo/add": {
    key: 6,
    level: 3,
    name: "添加照片",
    path: "/photo/add",
    prev: "/album/photo",
    active: false,
  },

  "/photo/edit": {
    key: 7,
    level: 3,
    name: "照片编辑",
    path: "/photo/edit",
    prev: "/album/photo",
    active: false,
  }
}

export default crumbDefine