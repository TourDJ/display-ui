import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Form,
  Icon,
  Row, 
  Col,
  Upload,
  message
} from 'antd'
import PageHead from '../CommonHeader/PageHead'
import { photoStateType, photoBatchType } from '../../actions/actionTypes'
import { parseBatchUpload } from '../../utils/uploadFile'
import { trackCurrDispatch, trackDispatch } from '../../actions'
import '../../utils/constant'

const PhotoCreate = Form.create()(
  class PhotoCreateForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        albumKey: -1,
        fileList: [],
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
      //When add photos success, see the result
      if(this.props.photoState != 0) {
        const { history: {location} } = this.props
        if(this.props.photoState == 1) {
          this.props.form.resetFields()
          message.success('保存成功', () => {this.props.history.push(`/album/photo/${this.state.albumKey}`)})
        } else if(this.props.photoState == -1) {
          message.error("保存失败")
        }
        this.props.dispatch({type: photoStateType['PHOTO_INITIAL_STATE']})
      }
    }

    handleChange = (info) => {
      let fileList = info.fileList

      // Read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url
        }
        return file
      })

      // Filter successfully uploaded files according to response from server
      fileList = fileList.filter((file) => {
        if (file.response) {
          return file.response.statusCode === 200
        }
        return true
      })

      this.setState({ fileList })
    }

    handleSubmit = (e) => {
      const form = this.props.form
      const { history: {location} } = this.props
      e.preventDefault()
      form.validateFields((err, values) => {
        if (err) {
          return
        }

        values = parseBatchUpload(this.state.fileList, this.state.albumKey)

        console.log('Received values of photo form: ', values)

        this.props.savePhotos(values)
      })
    }

    render() {
      const { form, history: {location} } = this.props
      const props = {
        action: `${constant.service_url}/upload?kind=photo-${location.state.albumKey}`,
        onChange: this.handleChange,
        multiple: true,
      }

      return (
        <div> 
          <PageHead icon="bar-chart" title="批量添加照片" history={this.props.history} />
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row type="flex" justify="center">
              <Col span={12}>
                <Upload {...props} fileList={this.state.fileList}>
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                  <span style={{marginLeft:10}}>批量选择要上传的文件</span>
                </Upload>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={12} offset={6}>
                <Button type="primary" style={{marginTop: 20}} htmlType="submit"
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

  savePhotos: (photos) => dispatch({
    type: photoBatchType['PHOTO_SAVE_BATCH'],
    photos
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoCreate)