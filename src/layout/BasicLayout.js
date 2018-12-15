import React, { Component } from 'react'
import BasicSkeleton from './BasicSkeleton'
import BasicRoute from '../routes/BasicRoute'

class BasicLayout extends Component {

  render() {

    return (
      <BasicSkeleton bread={this.props.bread}>
        {BasicRoute}
      </BasicSkeleton>  
    )
  }
}

export default BasicLayout
