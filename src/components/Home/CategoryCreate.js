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
import locale from '../../locales/locale'

const FormItem = Form.Item
const { TextArea } = Input;

const CategoryCreate = Form.create()(
  class CategoryCreateForm extends React.Component {

    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form

      return (
        <Modal
          visible={visible}
          title={locale['category.form.add.title']}
          okText={locale['category.form.add.btn.ok']}
          cancelText={locale['category.form.add.btn.cancel']}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label={locale['category.form.add.label.name']}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: locale['category.form.add.message.name'] }],
              })(
                <Input placeholder={locale['category.form.add.placeholder.name']} />
              )}
            </FormItem>

            <FormItem label={locale['category.form.add.label.code']}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: locale['category.form.add.message.code'] }],
              })(
                <Input style={{width:140}} placeholder={locale['category.form.add.placeholder.code']} />
              )}
            </FormItem>

            <FormItem label={locale['category.form.add.label.order']}>
              {getFieldDecorator('order')(
                <InputNumber min={1} max={10} />
              )}
            </FormItem>

            <FormItem label={locale['category.form.add.label.description']}>
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
)(CategoryCreate)    