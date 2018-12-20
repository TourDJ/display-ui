import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Radio,
  DatePicker,
  message
} from 'antd'
import moment from 'moment'
import PageHead from '../CommonHeader/PageHead'
import dateUtils from '../../utils/dateUtils'
import { photoType } from '../../actions/actionTypes'
import { trackCurrDispatch, trackDispatch } from '../../actions'

const { TextArea } = Input
const FormItem = Form.Item

const PhotoEdit = Form.create()(
  class PhotoEditForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: false,
        albumKey: -1
      }
    }

    componentDidMount() {
      const { history, history: {location}, dispatch } = this.props
      const { photo } = location.state
      this.setState({
        albumKey: photo.album
      })

      //Track the history
      trackDispatch(dispatch, history)
      trackCurrDispatch(dispatch, history.location.key)
    }

    componentDidUpdate(prevProps) {
      //When add a photo, see the result
      if(this.props.photoState != 0) {
        if(this.props.photoState == 1) {
          this.props.form.resetFields()
          message.success('保存成功', () => {this.props.history.push(`/album/photo/${this.state.albumKey}`)})
        } else if(this.props.photoState == -1) {
          message.error("保存失败")
        }
        this.props.dispatch({type: photoType['PHOTO_INITIAL_STATE']})
      }
    }

    handleSubmit = (e) => {
      const form = this.props.form
      const { history: {location} } = this.props
      const { photo } = location.state
      e.preventDefault()
      form.validateFields((err, values) => {
        if (err) {
          return
        }

        values.key = photo._key
        values.album = photo.album
        values.createTime = photo.createTime
        values.photo = photo.photo
        values.status = photo.status
        values.updateTime = Date.now()
        values.date = dateUtils.date2String(new Date(values.date), false)
        // delete values.upload
        console.log('Received values of photo form: ', values)

        this.props.updatePhoto(values)
      })
    }

    render() {
      const { visible, onCancel, onCreate, form, history: {location} } = this.props
      const { getFieldDecorator } = form
      const { photo } = location.state

      return (
        <div>
          <PageHead icon="bar-chart" title="编辑照片" history={this.props.history} />
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row type="flex" justify="center">
              <Col span={12}>
                <FormItem label="Title">
                  {getFieldDecorator('title', {
                    initialValue: photo.title,
                    rules: [{ required: true, message: 'Please input the title of album!' }],
                  })(
                    <Input placeholder="the title..." />
                  )}
                </FormItem>

                <FormItem label="Place" style={{width: '140px'}}>
                  {getFieldDecorator('place', {
                    initialValue: photo.place,
                    rules: [{ required: true, message: 'Select a category!' }],
                  })(
                    <Input placeholder="the place..." />
                  )}
                </FormItem>

                <FormItem label="Date">
                  {getFieldDecorator('date', {
                    initialValue: moment(photo.date),
                    rules: [{ required: true, message: 'Select a category!' }],
                  })(
                    <DatePicker />
                  )}
                </FormItem>

                <FormItem label="Description">
                  {getFieldDecorator('description', {
                    initialValue: photo.description,
                  })(<TextArea rows={8} />)}
                </FormItem>

                <FormItem label="Privacy" className="collection-create-form_last-form-item">
                  {getFieldDecorator('privacy', {
                    initialValue: photo.privacy,
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
  dispatch: dispatch,

  updatePhoto: (photo) => dispatch({
    type: photoType['PHOTO_UPDATE'],
    photo
  })
}) 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoEdit)    