import React , { PureComponent } from 'react'
import { 
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Radio,
  DatePicker
} from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'

const { TextArea } = Input
const FormItem = Form.Item

const PhotoEdit = Form.create()(
  class PhotoEditForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {

      }
    }

    componentDidMount() {
      
    }

    componentDidUpdate(prevProps) {

    }

    render() {
      const { visible, photo, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form

      return (
        <Modal
          visible={visible}
          title="Modify a photo"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Row type="flex" justify="center">
              <Col span={24}>
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
          </Form>
        </Modal>            
      )
    }
  }
)

const mapStateToProps = state => ({
  
})

export default connect(
  mapStateToProps
)(PhotoEdit)    