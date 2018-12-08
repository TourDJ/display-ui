import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Card, 
  Divider, 
  List, 
  Col,
  Icon
} from 'antd'
import { photoGet } from '../../actions'
import styles from './photo.less'

const { Meta } = Card;

class ViewPhoto extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    const { match, dispatch } = this.props
    dispatch(photoGet(match.params.key))
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
        <div className={styles.photoViewHead}><strong>{state.name}</strong></div>
        <Divider />
        {
          this.props.photos.length > 0 ?
          this.props.photos.map(pic => {
            return (
              <Col key={pic._key} span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  extra={`${pic.place}/${pic.date}`}
                  style={{ width: '100%', marginBottom: 20 }}
                  title={<span className={styles.photoTitle}>{pic.title}</span>} bordered={false}
                  actions={[<Icon type="like" />, <Icon type="dislike" />]}
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