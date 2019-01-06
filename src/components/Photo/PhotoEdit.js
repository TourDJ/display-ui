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
import { photoType, photoStateType } from '../../actions/actionTypes'
import { trackCurrDispatch, trackDispatch } from '../../actions'
import locale from '../../../config/locale'

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
          message.success(locale['photo.create.form.add.message.success'], () => {this.props.history.push(`/album/photo/${this.state.albumKey}`)})
        } else if(this.props.photoState == -1) {
          message.error(locale['photo.create.form.add.message.failure'])
        }
        this.props.dispatch({type: photoStateType['PHOTO_INITIAL_STATE']})
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
          <PageHead icon="bar-chart" title={locale['photo.edit.title']} history={this.props.history} />
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row type="flex" justify="center">
              <Col span={12}>
                <FormItem label={locale['photo.create.form.add.label.title']}>
                  {getFieldDecorator('title', {
                    initialValue: photo.title,
                    rules: [{ required: true, message: locale['photo.create.form.add.message.title'] }],
                  })(
                    <Input placeholder={locale['photo.create.form.add.placeholder.title']} />
                  )}
                </FormItem>

                <FormItem label={locale['photo.create.form.add.label.place']} style={{width: '140px'}}>
                  {getFieldDecorator('place', {
                    initialValue: photo.place,
                    rules: [{ required: true, message: locale['photo.create.form.add.message.place'] }],
                  })(
                    <Input placeholder={locale['photo.create.form.add.placeholder.place']} />
                  )}
                </FormItem>

                <FormItem label={locale['photo.create.form.add.label.date']}>
                  {getFieldDecorator('date', {
                    initialValue: moment(photo.date),
                    rules: [{ required: true, message: locale['photo.create.form.add.message.date'] }],
                  })(
                    <DatePicker placeholder={locale['photo.create.form.add.placeholder.date']} />
                  )}
                </FormItem>

                <FormItem label={locale['photo.create.form.add.label.description']}>
                  {getFieldDecorator('description', {
                    initialValue: photo.description,
                  })(<TextArea rows={8} />)}
                </FormItem>

                <FormItem label={locale['photo.create.form.add.label.privacy']} className="collection-create-form_last-form-item">
                  {getFieldDecorator('privacy', {
                    initialValue: photo.privacy,
                  })(
                    <Radio.Group>
                      <Radio value="1">{locale['photo.create.form.add.component.privacy.public']}</Radio>
                      <Radio value="2">{locale['photo.create.form.add.component.privacy.public']}</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={12} offset={6}>
                <Button type="primary" style={{marginRight: '20px'}} htmlType="submit"
                  loading={this.state.loading}>
                  {locale['photo.create.form.add.component.button.save']}
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