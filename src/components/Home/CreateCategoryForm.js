import React , { PureComponent } from 'react'
import { 
  Button,
  Form,
  Icon,
  Input,
  InputNumber,
  Modal
} from 'antd'
import { connect } from 'react-redux'

const FormItem = Form.Item
const { TextArea } = Input;

const CreateCategoryForm = Form.create()(
  class AlbumForm extends React.Component {

    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form

      return (
        <Modal
          visible={visible}
          title="Create a new Category"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of category!' }],
              })(
                <Input placeholder="input category name..." />
              )}
            </FormItem>

            <FormItem label="Code">
              {getFieldDecorator('code', {
                rules: [{ required: true, message: 'Please input the code of category!' }],
              })(
                <Input style={{width:140}} placeholder="code..." />
              )}
            </FormItem>

            <FormItem label="Sort">
              {getFieldDecorator('sort')(
                <InputNumber min={1} max={10} />
              )}
            </FormItem>

            <FormItem label="Description">
              {getFieldDecorator('description')(<TextArea rows={4} />)}
            </FormItem>

          </Form>
        </Modal>
      )
    }
  }
)

const mapStateToProps = state => ({
  category: state.category
})

export default connect(
  mapStateToProps
)(CreateCategoryForm)    