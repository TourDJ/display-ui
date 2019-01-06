import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Row, 
  Col,
  Icon,
  Divider
} from 'antd'
import styles from './index.less'
import locale from '../../../config/locale'

class PageHead extends PureComponent {

  handleBack(obj, e) {
    const { history } = this.props
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
              {locale['app.basic.return']}
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