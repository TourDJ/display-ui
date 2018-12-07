import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Avatar,
  Button,
  Card,  
  Divider,
  Form,  
  Modal, Icon, 
  Tabs, List,
  Tag, Col, Row, Popconfirm, message,
  Tooltip, Input
} from 'antd'
import { photoGet } from '../../actions'
import { photoType } from '../../actions/actionTypes'
import '../../utils/constant'
import styles from './photo.less'

const { Meta } = Card
const { TextArea } = Input

class Photo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  componentDidMount() {
    const { match } = this.props
    this.props.dispatch(photoGet(match.params.key))
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    console.log(this.props)
    if(prevProps.photos.length != this.props.photos.length) {

    }
  }

  addPhoto() {
    const { match } = this.props
    this.props.history.push('/photo/add', {albumKey: match.params.key})
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {

    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  //Edit photo's description
  editPhoto = (key) => {
    this.showModal()
  }

  //Delete photo confirm
  confirmDelete = (key) => {
    this.props.dispatch({
      type: photoType['PHOTO_DELETE'], 
      key: key
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
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
        <Divider />
        <Row>
        {
          this.props.photos.length > 0 ?
          this.props.photos.map(pic => {
            return (
              <Col key={pic._key} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  className={styles.photoEditCard}
                  title={`${pic.title}`}
                  cover={<img src={`${constant.service_url}${pic.photo.filepath}`} width="100%" />}
                  actions={[
                    <Tooltip title='照片编辑'>
                      <Icon type="setting" theme="filled" onClick={() => this.editPhoto(pic._key)} />
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
                  <Meta className={styles.photoEditDiv} 
                        description={pic.description}/>
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
