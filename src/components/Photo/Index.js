import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Avatar,
  Button,
  Card,  
  Divider,
  Form,  
  Icon, 
  Tabs, List,
  Tag, Col, Row, Popconfirm, message 
} from 'antd'
import { photoGet } from '../../actions'
import { photoType } from '../../actions/actionTypes'
import '../../utils/constant'
import styles from './photo.less'

const { Meta } = Card;

class Photo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      albumKey: this.props.match.params.key,
      pics: []
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(photoGet(this.state.albumKey))
  }

  componentDidUpdate(prevProps) {
    if(prevProps.photos.length != this.props.photos.length) {
      this.setState({
        pics: this.props.photos
      })
    }
  }

  addPhoto() {
    this.props.history.push('/photo/add', {albumKey: this.state.albumKey})
  }

  render() {
    const { match } = this.props
    const noPhoto = ['没有照片']

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon="photo" className={styles.btn} 
              onClick={this.addPhoto.bind(this)}>添加照片</Button>
        </div>
        <Divider />
        {
          this.state.pics.length > 0 ?
          this.state.pics.map(pic => {
            return (
              <Col key={pic._key} span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  style={{ width: '100%', marginBottom: 20 }}
                  title="Card title" bordered={false}
                >
                  <img src={`${constant.service_url}${pic.photo.filepath}`} width="100%" />
                  <Meta
      title="Europe Street beat"
      description="www.instagram.com"
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
)(Photo)