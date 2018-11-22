import React , { PureComponent } from 'react'
import { 
  Button,
  Form,
  Icon,
  Input,
  Modal,
  Radio,
  Upload
} from 'antd'

const FormItem = Form.Item

const CreateForm = Form.create()(
  class extends React.Component {
    state = {
      loading: false,
    };

    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const imageUrl = this.state.imageUrl;
      const props = {
        action: '//jsonplaceholder.typicode.com/posts/',
        // onChange: this.handleChange,
        multiple: true,
      };
    
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input placeholder="the title..." />
              )}
            </FormItem>

            <FormItem label="Cover">
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [{ required: true, message: 'Please select a cover!' }],
              })(
                <Upload name="cover" action="/upload.do"
                        className="avatar-uploader" listType="picture-card">
                  {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
              )}
            </FormItem>

            <FormItem label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </FormItem>

            <FormItem label="Avatar" extra="haaaaaa">
              {getFieldDecorator('avatar')(
                <Upload {...props} >
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                </Upload>
              )}
            </FormItem>

            <FormItem label="Privacy" className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'private',
              })(
                <Radio.Group>
                  <Radio value="public">Public</Radio>
                  <Radio value="private">Private</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

export default CreateForm