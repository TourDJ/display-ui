import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Form,
  Icon,
  message,
  Input,
  Modal,
  Radio,
  Select, Row, Col,
  Upload, DatePicker
} from 'antd'
import PageHead from '../CommonHeader/PageHead'
import { photoType } from '../../actions/actionTypes'
import { trackCurrDispatch, trackDispatch } from '../../actions'
import { getBase64, checkFile, parseUpload } from '../../utils/uploadFile'
import dateUtils from '../../utils/dateUtils'
import '../../utils/constant'

const { TextArea } = Input
const FormItem = Form.Item

function beforeUpload(file) {
  let fileResult = checkFile(file)
  if(fileResult && fileResult.message)
    message.error(fileResult.message)

  return fileResult
}

const PhotoCreate = Form.create()(
  class PhotoCreateForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: false,
        uploading: false,
        imageUrl: null,
        albumKey: -1
      }
    }

    componentDidMount() {
      const { history, history: {location}, dispatch } = this.props
      this.setState({
        albumKey: location.state.albumKey
      })

      //Track the history
      trackDispatch(dispatch, history)
      trackCurrDispatch(dispatch, history.location.key)
    }

    componentDidUpdate(prevProps) {
      //When add a photo, see the result
      if(this.props.photoState != 0) {
        const { history: {location} } = this.props
        if(this.props.photoState == 1) {
          this.props.form.resetFields()
          message.success('保存成功', () => {this.props.history.push(`/album/photo/${this.state.albumKey}`)})
        } else if(this.props.photoState == -1) {
          message.error("保存失败")
        }
        this.props.dispatch({type: photoType['PHOTO_INITIAL_STATE']})
      }
    }

    handleChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ uploading: true })
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          uploading: false,
        }))
      }
    }

    handleSubmit = (e) => {
      const form = this.props.form
      const { history: {location} } = this.props
      e.preventDefault()
      form.validateFields((err, values) => {
        if (err) {
          return
        }

        values.photo = parseUpload(values.photo)
        if(values.photo.filepath.indexOf("//") == 0)
          values.photo.filepath = values.photo.filepath.substr(1)

        values.date = dateUtils.date2String(new Date(values.date), false)
        // delete values.upload
        console.log('Received values of photo form: ', values)

        this.props.savePhoto(values, location.state.albumKey)
      })
    }

    render() {
      const { form, history: {location} } = this.props
      const { getFieldDecorator } = form
      const uploadButton = (
        <div>
          <Icon type={this.state.uploading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      )
      const imageUrl = this.state.imageUrl
      const coverProps = {
        action: `${constant.service_url}/upload?kind=photo-${location.state.albumKey}`,
        headers:{method:'POST'},
        multiple: false,
        name: "photo",
        className: "avatar-uploader",
        listType: "picture-card",
        showUploadList: false,
      }

      return (
        <div> 
          <PageHead icon="bar-chart" title="添加照片" history={this.props.history} />
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row type="flex" justify="center">
              <Col span={12}>
                <FormItem label="Title">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input the title of album!' }],
                  })(
                    <Input placeholder="the title..." />
                  )}
                </FormItem>

                <FormItem label="Place" style={{width: '140px'}}>
                  {getFieldDecorator('place', {
                    rules: [{ required: true, message: 'Select a category!' }],
                    initialValue: this.state.selectTab,
                  })(
                    <Input placeholder="the place..." />
                  )}
                </FormItem>

                <FormItem label="Date">
                  {getFieldDecorator('date', {
                    rules: [{ required: true, message: 'Select a category!' }],
                    initialValue: this.state.selectTab,
                  })(
                    <DatePicker />
                  )}
                </FormItem>

                <FormItem label="Photo">
                  {getFieldDecorator('photo', {
                    rules: [{ required: true, message: 'Please select a cover!' }],
                  })(
                    <Upload {...coverProps}
                      beforeUpload={beforeUpload} onChange={this.handleChange}>
                      {
                        imageUrl ? 
                          <img src={imageUrl} style={{maxWidth:'400px'}} alt="cover" /> 
                        : uploadButton
                      }
                    </Upload>
                  )}
                </FormItem>

                <FormItem label="Description">
                  {getFieldDecorator('description')(<TextArea rows={8} />)}
                </FormItem>

                <FormItem label="Privacy" className="collection-create-form_last-form-item">
                  {getFieldDecorator('privacy', {
                    initialValue: '2',
                  })(
                    <Radio.Group>
                      <Radio value="1">Public</Radio>
                      <Radio value="2">Private</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
             
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={12} offset={6}>
                <Button type="primary" style={{marginRight: '20px'}} htmlType="submit"
                  loading={this.state.loading}>
                  保存
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      )
    }
  }
)

const mapStateToProps = state => ({
  photoState: state.photoState
})

const mapDispatchToProps = dispatch => ({
  dispatch,

  savePhoto: (photo, album) => dispatch({
    type: photoType['PHOTO_SAVE'],
    photo,
    album
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoCreate)