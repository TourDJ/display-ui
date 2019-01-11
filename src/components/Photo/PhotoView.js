import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Avatar,
  Card, 
  Divider, 
  List, 
  Col,
  Icon,
  Row,
  Rate
} from 'antd'
import PageHead from '../CommonHeader/PageHead'
import PhotoFoot from './PhotoFoot'
import { photoGet, albumGet, albumUpdate,
  trackCurrDispatch, trackDispatch } from '../../actions'
import styles from './photo.less'
import locale from '../../../config/locale'
import icons from '../../../config/icons'

const { Meta } = Card

class ViewPhoto extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    const { history, match, dispatch } = this.props
    dispatch(albumGet(match.params.key))
    dispatch(photoGet(match.params.key))

    //Track the history
    trackDispatch(dispatch, history)
    trackCurrDispatch(dispatch, history.location.key)
  }

  componentDidUpdate(prevProps) {
    // let { dispatch, album } = this.props 
    // if(prevProps.album._key != album._key) {
    //   let views = !album.views ? 0 : album.views
    //   album.views = views + 1
    //   album.key = album._key
    //   dispatch(albumUpdate(album))
    // }
  }

  render() {
    const { history: {location: {state}} } = this.props
    const noPhoto = [ locale['photo.index.data.no'] ]

    return (
      <div>
        <PageHead icon={icons['photo_view']} title={state.name} history={this.props.history} />
        <Row>
        {
          this.props.photos.length > 0 ?
          this.props.photos.map(pic => {
            return (
              <Col key={pic._key} span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  extra={(
                    <div>
                      <strong>{pic.place}</strong>
                      &nbsp;&nbsp;
                      <strong style={{color: 'green'}}>/</strong>
                      &nbsp;&nbsp;
                      <strong>{pic.date}</strong>
                    </div>
                    )}
                  style={{ width: '100%', marginBottom: 5 }}
                  title={<span className={styles.photoTitle}>{pic.title}</span>} bordered={false}
                >
                  <img src={`${constant.service_url}${pic.photo.filepath}`} width="100%" />
                  <Meta
                    style={{marginTop:'10px'}}
                    description={<span><Icon type="tags" theme="twoTone"/>&nbsp;&nbsp;
                    <span style={{color: '#6D7F3FFF'}}>{pic.description}</span></span>}
                  />
                </Card>
              </Col>
            )
          })
          : <List style={{width:'10%', marginLeft: '45%'}}
              itemLayout="horizontal"
              dataSource={noPhoto}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        }
        </Row>
        <PhotoFoot album={this.props.album} photos={this.props.photos} />
      </div>
    )   
  }  
}

const mapStateToProps = state => ({
  album: state.albumCurrent,
  photos: state.photos
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPhoto)