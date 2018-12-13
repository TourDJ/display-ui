import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd';

const Navigator = () => (
  <div>
    <div><Link to="/">Home</Link> 
    <Link to="/hello">Hello</Link> 
    <Link to="/counter">Counter</Link></div>

    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
  </div>
)

export default Navigator
