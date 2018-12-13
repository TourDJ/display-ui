import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'antd'
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
        <Link to="/" className={styles.logo} key="logo">
{/*          <img src={logo} alt="logo" width="32" />
          */}
          游記<Divider type="vertical" key="line" />Journey
        </Link>
        
        <TopHeadRight user={user} />
      </div>
    )
  }
}
