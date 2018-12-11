import React , { PureComponent } from 'react'
import { 
  Button,
  Row, 
  Col,
  Icon,
  Divider
} from 'antd'
import styles from './index.less'

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
              返回
            </Button>
          </Col>
        </Row>
        <Divider />
      </Row>
    )
  }
}

export default PageHead