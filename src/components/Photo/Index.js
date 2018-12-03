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
import styles from './photo.less'

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
            <Col key={pic._key} span={6} xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card
                style={{ width: 300, marginBottom: 20 }}
              >
                {pic.name}
              </Card>
            </Col>
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
