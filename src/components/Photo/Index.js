import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Avatar,
  Button,
  Card,  
  Divider,
  Modal, Icon, 
  Tabs, List,
  Tag, Col, Row, Popconfirm, message,
  Tooltip, Input,
  Pagination
} from 'antd'
import PageHead from '../CommonHeader/PageHead'
import PhotoEdit from './PhotoEdit'
import { photoGet } from '../../actions'
import { photoType } from '../../actions/actionTypes'
// import '../../utils/constant'
import dateUtils from '../../utils/dateUtils'
import styles from './photo.less'

const { Meta } = Card

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize)
}

class Photo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      currPhoto: {},
      current: 1
    }
  }

  componentDidMount() {
    const { match } = this.props
    this.props.dispatch(photoGet(match.params.key))
  }

  componentDidUpdate(prevProps) {
    if(prevProps.photos.length != this.props.photos.length) {

    }
  }

  addPhoto() {
    const { match } = this.props
    this.props.history.push('/photo/add', {albumKey: match.params.key})
  }

  showModal = (photo) => {
    this.setState({
      visible: true,
      currPhoto: photo
    })
  }

  handleOk = () => {
    const form = this.photoFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      values.key = this.state.currPhoto._key
      values.date = dateUtils.date2String(new Date(values.date), false)
      // delete values.upload
      console.log('Received values of photo form: ', values)

      this.props.updatePhoto(values)
      this.setState({
        visible: false,
      })
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  //Edit photo's description
  editPhoto = (photo) => {
    this.showModal(photo)
  }

  //Delete photo confirm
  confirmDelete = (key) => {
    this.props.dispatch({
      type: photoType['PHOTO_DELETE'], 
      key: key
    })
  }

  //Photo edit form
  editPhotoFormRef = (photoFormRef) => {
    this.photoFormRef = photoFormRef
  }

  pageChange = (page) => {
    this.setState({
      current: page,
    })
  }

  render() {
    const noPhoto = ['没有照片']

    return (
      <div>
        <PageHead icon="setting" title="照片管理" history={this.props.history} />
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon="photo" className={styles.btn} 
              onClick={this.addPhoto.bind(this)}>添加照片</Button>
          <PhotoEdit 
            wrappedComponentRef={this.editPhotoFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleOk}
            photo={this.state.currPhoto}
          />
        </div>
        <Row>
        {
          this.props.photos.length > 0 ?
          this.props.photos.map(pic => {
            return (
              <Col key={pic._key} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  className={styles.photoEditCard}
                  title={`${pic.title}`}
                  extra={`${pic.place}/${pic.date}`}
                  cover={<img src={`${constant.service_url}${pic.photo.filepath}`} width="100%" />}
                  actions={[
                    <Icon type="setting" theme="filled" onClick={() => this.editPhoto(pic)} />,
                    <Popconfirm title="确定要删除该照片吗?" 
                          okText="确定" cancelText="取消"
                          onConfirm={() => this.confirmDelete(pic._key)}> 
                      <Icon type="delete" theme="filled" />
                    </Popconfirm>
                  ]}                  
                >
                  <Meta className={styles.photoEditDiv} 
                        description={pic.description}/>
                </Card>
              </Col>
            )
          })
          : <List className={styles.photoNoData}
              itemLayout="horizontal"
              dataSource={noPhoto}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        }
        </Row>
        <Row>
          <Pagination 
            className={styles.page}
            current={this.state.current} 
            pageSize={20}
            total={this.props.photos.length}
            showTotal={(total, range) => `总共 ${total} 条记录`}
            onChange={this.pageChange} />
        </Row>
      </div>
    )   
  }
}

const mapStateToProps = state => ({
  photos: state.photos
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,

  updatePhoto: (photo) => dispatch({
    type: photoType['PHOTO_UPDATE'],
    photo
  })
})  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photo)
