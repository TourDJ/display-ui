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
import { photoGet, trackCurrDispatch, trackDispatch } from '../../actions'
import styles from './photo.less'

const { Meta } = Card

class ViewPhoto extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    const { history, match, dispatch } = this.props
    dispatch(photoGet(match.params.key))

    //Track the history
    trackDispatch(dispatch, history)
    trackCurrDispatch(dispatch, history.location.key)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.photos.length != this.props.photos.length) {

    }
  }

  render() {
    const { history: {location: {state}} } = this.props
    const noPhoto = ['没有照片']

    return (
      <div>
        <PageHead icon="bars" title={state.name} history={this.props.history} />
        <Row>
        {
          this.props.photos.length > 0 ?
          this.props.photos.map(pic => {
            return (
              <Col key={pic._key} span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  extra={(
                    <div>
                      <Icon type="like" className={styles.photoLike} />
                      <strong>{pic.place}/{pic.date}</strong>
                    </div>
                    )}
                  style={{ width: '100%', marginBottom: 5 }}
                  title={<span className={styles.photoTitle}>{pic.title}</span>} bordered={false}
                >
                  <img src={`${constant.service_url}${pic.photo.filepath}`} width="100%" />
                  <Meta
                    style={{marginTop:'10px'}}
                    description={pic.description}
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
        <PhotoFoot photos={this.props.photos} />
      </div>
    )   
  }  
}

const mapStateToProps = state => ({
  photos: state.photos
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPhoto)