import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Row, Col } from 'antd'
import moment from 'moment'
import TopHeadRight from './TopHeadRight'
import styles from './index.less'

export default class CommonHeader extends PureComponent {

  componentWillUnmount() {
    
  }

  render() {
    const {
      user = {},
      logo
    } = this.props


    return (
      <div className={styles.header}>
        <Row>
          <Col span={8}>
            <Link to="/" className={styles.logo} key="logo">
            {/* <img src={logo} alt="logo" width="32" /> */}
              <strong>游&nbsp;&nbsp;記</strong>
            </Link>
          </Col>
          <Col span={12}>
            <span>解放心情，踏足远行</span>
          </Col>
          <Col span={4}>
            <TopHeadRight user={user} />
          </Col>
        </Row>
      </div>
    )
  }
}
