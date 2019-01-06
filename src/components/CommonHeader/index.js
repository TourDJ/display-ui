import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Divider, Row, Col } from 'antd'
import moment from 'moment'
import TopHeadRight from './TopHeadRight'
import { userType } from '../../actions/actionTypes'
import styles from './index.less'
import '../../utils/constant'
import locale from '../../../config/locale'

class CommonHeader extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      id: -1
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const id = "0001"
    dispatch({
      type: userType['USER_GET'],
      id: id
    })
    this.setState({
      id: id
    })
  }

  componentDidUpdate(prevProps) {
    
  }

  render() {
    const { user } = this.props

    return (
      <div className={styles.header}>
        <Row>
          <Col span={8}>
            {
              user.site && user.site.logo ?
              <Link to="/" className={styles.logo} key="logo">
                <img src={`${constant.service_url}${user.site.logo}`} width="32" />
              </Link>
              : null
            }
            <Link to="/" className={styles.caption} key="caption">
              {
                user.site && user.site.caption ?
                <img src={`${constant.service_url}${user.site.caption}`} 
                  height="55" />
                : <strong>{locale['app.basic.caption']}</strong>
              }

            </Link>
          </Col>
          <Col span={12}>
            {
              user.site && user.site.banner ?
              <img src={`${constant.service_url}${user.site.banner}`} height="55" />
              : <span>{locale['app.basic.banner']}</span>
            }        
          </Col>
          <Col span={4}>
            <TopHeadRight user={this.props.user} />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonHeader)