import React , { PureComponent } from 'react'
import { 
  Row, 
  Col,
  Rate,
  Divider
} from 'antd'
import styles from './photo.less'

class PhotoFoot extends PureComponent {

  starHandle = (value) => {
    console.log(value)
  }

  render() {
    return (
      <Row>
        {
          this.props.photos.length > 0 ?
          <Row>
            <Col>
              <Divider />
              <strong className={styles.photoFootTitle}>感觉怎样？&nbsp;</strong>
              <Rate defaultValue={1} onChange={(value) => this.starHandle(value)} />
            </Col>
          </Row>
          : null
        }
      </Row>
    )
  }
}

export default PhotoFoot