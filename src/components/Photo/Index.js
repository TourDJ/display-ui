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
  Tag, Col, Row, Popconfirm, message,
  Tooltip
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

  //Delete photo confirm
  confirmDelete = (key) => {
    this.props.dispatch({
      // type: albumType['ALBUM_DELETE'], 
      // key: key
    })
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
              <Row gutter={16}>
              <Col key={pic._key} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  style={{ width: '100%', marginBottom: 20 }}
                  cover={<img src={`${constant.service_url}${pic.photo.filepath}`} width="100%" />}
                  actions={[
                    <Tooltip title='照片编辑'>
                      <Icon type="setting" theme="filled" onClick={this.setAlbum} />
                    </Tooltip>,
                    <Tooltip title='照片删除'>
                      <Popconfirm title="确定要删除该照片吗?" 
                            okText="确定" cancelText="取消"
                            onConfirm={() => this.confirmDelete(pic._key)}> 
                        <Icon type="delete" theme="filled" />
                      </Popconfirm>
                    </Tooltip>
                  ]}                  
                >
                  
                  <Meta
                    title={`${pic.title}`}
                    description={`${pic.description}`}
                  />
                </Card>
              </Col>
              </Row>
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
