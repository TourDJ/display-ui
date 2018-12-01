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
import CreatePictureForm from './CreatePictureForm'
import { pictureGet } from '../../actions'
import { pictureType } from '../../actions/actionTypes'
import styles from './picture.less'

class Picture extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pictureVisible: false,
      pics: []
    }
  }

  componentDidMount() {
    const { match, dispatch } = this.props
    const key = match.params.key
    dispatch(pictureGet(key))
    // this.setState({
    //   pics: this.props.pictures
    // })
  }

  componentDidUpdate(prevProps) {
    
  }

  showPictureModal() {
    const form = this.pictureFormRef.props.form
    form.resetFields()
    this.setState({ pictureVisible: true })
  }

  savePictureFormRef = (pictureFormRef) => {
    this.pictureFormRef = pictureFormRef
  }

  pictureHandleCancel = () => {
    this.setState({ pictureVisible: false })
  }

  pictureHandleCreate = () => {
    const form = this.pictureFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Received values of picture form: ', values)

      this.props.savePicture(values)

      form.resetFields()
      this.setState({ pictureVisible: false })
    })
  }

  render() {
    const { match } = this.props
    const noPicture = ['没有照片']

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon="picture" className={styles.btn} onClick={this.showPictureModal}>添加照片</Button>
          <CreatePictureForm
            wrappedComponentRef={this.savePictureFormRef}
            visible={this.state.pictureVisible}
            onCancel={this.pictureHandleCancel}
            onCreate={this.pictureHandleCreate}
          />
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
              dataSource={noPicture}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        }
      </div>
    )   
  }
}

const mapStateToProps = state => ({
  pictures: state.pictures
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,

  savePicture: (picture, album) => dispatch({
    type: pictureType['PICTURE_SAVE'], 
    picture: picture,
    album: album
  })
})  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Picture)
