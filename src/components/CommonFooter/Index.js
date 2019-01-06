import React, { PureComponent } from 'react'
import { 
  Row, 
  Col
} from 'antd'
import styles from './index.less'

export default class CommonFooter extends PureComponent {

  render() {
    return (
      <Row>
        <Col>
          游记 ©2018 Created by Hank Jiefang
        </Col>
      </Row> 
    )
  }
}