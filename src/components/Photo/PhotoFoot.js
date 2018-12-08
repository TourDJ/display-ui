import React , { PureComponent } from 'react'
import { 
  Row, 
  Col,
  Rate,
  Divider
} from 'antd'

class PhotoFoot extends PureComponent {

  render() {
    return (
      <Row>
        {
          this.props.photos.length > 0 ?
          <Row>
            <span>感觉怎样？&nbsp;</span>
            <Rate defaultValue={3} />
          </Row>
          : null
        }
      </Row>
    )
  }
}

export default PhotoFoot