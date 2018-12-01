import React , { PureComponent } from 'react'
import { 
  Button,
  Form,
  Icon,
  message,
  Input,
  Modal,
  Radio,
  Select,
  Upload
} from 'antd'
import { connect } from 'react-redux'
import { getBase64, checkFile } from '../../utils/tool_file'
import '../../utils/constant'

const { TextArea } = Input;

function beforeUpload(file) {
  let fileResult = checkFile(file)
  if(fileResult && fileResult.message)
    message.error(fileResult.message)

  return fileResult
}

const CreatePictureForm = Form.create()(
  class PictureForm extends React.Component {
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
          title="Add a photo"
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

            <FormItem label="Category">
              {getFieldDecorator('category', {
                rules: [{ required: true, message: 'Select a category!' }],
                initialValue: this.state.selectTab,
              })(
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    labelInValue
                    optionFilterProp="children"
                    onChange={categoryChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {this.state.categoryOptions}
                  </Select>
              )}
            </FormItem>

            <FormItem label="Cover">
              {getFieldDecorator('cover', {
                rules: [{ required: true, message: 'Please select a cover!' }],
              })(
                <Upload {...coverProps}
                  beforeUpload={beforeUpload} onChange={this.handleChange}>
                  {imageUrl ? <img src={imageUrl} style={{maxWidth:'400px'}} alt="cover" /> 
                  : uploadButton}
                </Upload>
              )}
            </FormItem>

            <FormItem label="Description">
              {getFieldDecorator('description')(<TextArea rows={4} />)}
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
)(CreatePictureForm)