import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Divider, Row, Col } from 'antd'
import moment from 'moment'
import TopHeadRight from './TopHeadRight'
import { userType } from '../../actions/actionTypes'
import styles from './index.less'
import '../../utils/constant'

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

    return (
      <div className={styles.header}>
        <Row>
          <Col span={8}>
            <Link to="/" className={styles.logo} key="logo">
              {/* <img src={logo} alt="logo" width="32" /> */}             
              {
                this.props.user.site ?
                <img src={`${constant.service_url}${this.props.user.site.title}`} 
                  height="55" />
                : <strong>游&nbsp;&nbsp;記</strong>
              }

            </Link>
          </Col>
          <Col span={12}>
            {
              this.props.user.site ?
              <img src={`${constant.service_url}${this.props.user.site.banner}`} height="55" />
              : <span>解放心情，踏足远行</span>
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