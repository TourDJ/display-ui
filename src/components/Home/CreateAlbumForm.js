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
import '../../utils/constant'

const FormItem = Form.Item
const Option = Select.Option

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

function categoryChange(value) {
  
}

const CreateAlbumForm = Form.create()(
  class AlbumForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: false,
        categoryOptions: [],
        selectTab: {}
      }
    }

    componentDidMount() {
      
    }

    componentDidUpdate(prevProps) {
      //Use catetores wrap select options
      if(this.props.category.length != prevProps.category.length) {
        let categories = this.props.category
        this.getCategoties(categories)
      }
      
      //When change the tab, also change the default seleted 
      //item for category select
      if(this.props.activeKey != prevProps.activeKey) {
        this.changeSelectTab(this.props.activeKey, this.props.category)
      }
    }

    changeSelectTab(activeKey, category) {
      let tempTab = {}
      if(category) {
        category.forEach(function(cat){
          if(cat && cat._key == activeKey) {
            tempTab = {key: cat._key, label: cat.name}
          }
        })
        this.setState({
          selectTab: tempTab
        })
      }
    }

    getCategoties(categories) {
      const categoryDatas = []
      const _this = this
      categories.map((category) => {
        return(
          categoryDatas.push(
            <Select.Option value={category._key} key={category._key}>
              {category.name}
            </Select.Option>
          ),
          _this.setState({
            categoryOptions: categoryDatas,
          })
        )
      })
    }

    handleChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true })
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          loading: false,
        }))
      }
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      )
      const imageUrl = this.state.imageUrl
      const coverProps = {
        action: `${constant.service_url}/upload?kind=cover`,
        headers:{method:'POST'},
        multiple: false,
        name: "cover",
        className: "avatar-uploader",
        listType: "picture-card",
        showUploadList: false,
      }
    
      return (
        <Modal
          visible={visible}
          title="Create a new album"
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
              {getFieldDecorator('upload', {
                rules: [{ required: true, message: 'Please select a cover!' }],
              })(
                <Upload {...coverProps}
                  beforeUpload={beforeUpload} onChange={this.handleChange}>
                  {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
              )}
            </FormItem>

            <FormItem label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
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
  category: state.category
})

export default connect(
  mapStateToProps
)(CreateAlbumForm)