import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Row, 
  Col,
  Icon,
  Divider
} from 'antd'
// import { breadType, breadSizeType } from '../../actions/actionTypes'
import styles from './index.less'

class PageHead extends PureComponent {

  handleBack(obj, e) {
    const { history } = this.props
    // this.props.dispatch({
    //   type: breadType['BREAD_POP']
    // })
    // this.props.dispatch({
    //   type: breadSizeType['BREAD_SIZE_MINUS']
    // })
    if(history) {
      history.go(-1)
    }
  }

  render() {
    return (
      <Row className={styles.pageHead}>
        <Row>
          <Col span={20}>
            <Icon type={this.props.icon} />&nbsp;
            <strong>{this.props.title}</strong>
          </Col>
          <Col span={4}>
            <Button type="primary" ghost htmlType="button" onClick={this.handleBack.bind(this)}
              style={{float: 'right'}}>
              返回
            </Button>
          </Col>
        </Row>
        <Divider />
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHead)