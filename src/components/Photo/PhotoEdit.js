import React , { PureComponent } from 'react'
import { 
  Button,
  Form,
  Input
} from 'antd'
import { connect } from 'react-redux'

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
      const { visible, onCancel, onCreate, form } = this.props
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
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of album!' }],
              })(
                <Input placeholder="the title..." />
              )}
            </FormItem>
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