import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Button,
  Form,
  Icon,
  message,
  Input,
  Row, Col,
  Radio,
  Select,
  Upload
} from 'antd'
import PageHead from '../CommonHeader/PageHead'
import { parseUpload } from '../../utils/uploadFile'
import { albumType, trackStackType } from '../../actions/actionTypes'
import { trackCurrDispatch, trackDispatch } from '../../actions'
import { getBase64, checkFile } from '../../utils/uploadFile'
// import '../../utils/constant'

const FormItem = Form.Item
const Option = Select.Option

function beforeUpload(file) {
  let fileResult = checkFile(file)
  if(fileResult && fileResult.message)
    message.error(fileResult.message)

  return fileResult
}

function categoryChange(value) {
  
}

const AlbumCreate = Form.create()(
  class AlbumCreateForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: false,
        uploading: false,
        imageUrl: null,
        categoryOptions: [],
        selectTab: null
      }
    }

    componentDidMount() {
      const { history, history: { location}, dispatch} = this.props
      //Track the history
      trackDispatch(dispatch, history)
      trackCurrDispatch(dispatch, history.location.key)

      //Use catetores wrap select options
      this.getCategotySelect(this.props.category)

      //When change the tab, also change the default seleted 
      //item for category select
      this.changeSelectTab(location.state.categoryKey, this.props.category)

      //Record router history
      console.log(this.props)
    }

    componentDidUpdate(prevProps) {

      //When add a album, see the result
      if(this.props.albumState != 0) {
        if(this.props.albumState == 1) {
          this.props.form.resetFields()
          message.success('保存成功', () => {this.props.history.push(`/`)})
        } else if(this.props.albumState == -1) {
          message.error("保存失败")
        }
        this.props.dispatch({type: albumType['ALBUM_INITIAL_STATE']})
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

    getCategotySelect(categories) {
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

    uploadChange = (info) => {
      if (info.file.status === 'uploading') {
        this.setState({ uploading: true })
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
          imageUrl,
          uploading: false,
        }))
      }
    }

    handleSubmit = (e) => {
      const form = this.props.form
      const { history: {location} } = this.props
      e.preventDefault()
      form.validateFields((err, values) => {
        if (err) {
          return
        }

        let _category = values.category
        values.category = _category.key
        values.cover = parseUpload(values.cover)
        console.log('Received values of album form: ', values)

        this.props.saveAlbum(values)
      })
    }

    render() {
      const { form, history: {location} } = this.props
      const { getFieldDecorator } = form
      const uploadButton = (
        <div>
          <Icon type={this.state.uploading ? 'loading' : 'plus'} />
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
        <div>
          <PageHead icon="setting" title="添加相册" history={this.props.history} />
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row type="flex" justify="center">
              <Col span={12}>
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
                    initialValue: this.state.selectTab && this.state.selectTab.key ? 
                                  this.state.selectTab : {key: '', label: ''},
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
                      beforeUpload={beforeUpload} onChange={this.uploadChange}>
                      {imageUrl ? <img src={imageUrl} style={{maxWidth:'400px'}} alt="cover" /> 
                      : uploadButton}
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
  router: state.router,
  category: state.category,
  albumState: state.albumState
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,

  saveAlbum: (album) => dispatch({
    type: albumType['ALBUM_SAVE'], 
    album: album
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumCreate)