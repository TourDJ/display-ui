import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Row, 
  Col,
  Rate,
  Divider
} from 'antd'
import { albumUpdate } from '../../actions'
import styles from './photo.less'
import locale from '../../../config/locale'

class PhotoFoot extends PureComponent {

  componentDidMount() {
    
  }

  starHandle = (album, value) => {
    const { dispatch } = this.props
    dispatch(albumUpdate({
      key: album._key,
      star: value
    }))
  }

  render() {
    const { album } = this.props

    return (
      <Row>
        {
          this.props.photos.length > 0 ?
          <Row>
            <Col>
              <Divider />
              <strong className={styles.photoFootTitle}>{locale['photo.view.foot.rate']}&nbsp;</strong>
              <Rate defaultValue={album.star} onChange={(value) => this.starHandle(album, value)} />
            </Col>
          </Row>
          : null
        }
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  album: state.albumCurrent
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoFoot)