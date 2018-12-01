import React from 'react'
import BasicSkeleton from './BasicSkeleton'
import BasicRoute from '../routes/BasicRoute'

const BasicLayout = () => {
  return (
    <BasicSkeleton>
      {BasicRoute}
    </BasicSkeleton>  
  )
}

export default BasicLayout
