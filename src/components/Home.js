import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Avatar,
  Button,
  Card,  
  Divider,
  Form, 
  Input, 
  Icon, 
  Modal,
  Radio,
  Tabs, 
  Tag 
} from 'antd'
import 'antd/dist/antd.css'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const { Meta } = Card

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
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
                <Input />
              )}
            </FormItem>
            <FormItem label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </FormItem>
            <FormItem className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'public',
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

//主页
class Home extends PureComponent {
	constructor(props) {
		super(props)
    this.state = {
    	visible: false,
      panes: [],
    }
	}

	componentDidMount() {
		let getCategories = this.props.getCategories
    getCategories()
	}

  componentDidUpdate() {
    let category = this.props.category
    this.setState({
      panes: category
    })
  }

	showModal = () => {
    this.setState({ visible: true })
  }


  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Received values of form: ', values)
      form.resetFields()
      this.setState({ visible: false })
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

	callback = (key) => {
	  console.log(key)
	}

	render() {
		return (
		  <div>
        <div style={{ marginBottom: 16 }}>
          <Button icon="picture" onClick={this.showModal}>新建分类</Button>
          <Button type="primary" icon="picture" onClick={this.showModal}>新建相册</Button>
          <Button type="danger" icon="picture">删除相册</Button>
          <CollectionCreateForm
	          wrappedComponentRef={this.saveFormRef}
	          visible={this.state.visible}
	          onCancel={this.handleCancel}
	          onCreate={this.handleCreate}
	        />
        </div>		    
        <Tabs onChange={this.callback} type="card">
          {
            this.state.panes.map(pane => (
              <TabPane tab={pane.name} key={pane.ident}>
                <div style={{marginBottom: 10}}>
                  <Tag color="#108ee9">{pane.description}</Tag>
                </div>
                <Divider />
                {
                  pane.albums.map(album => (
                <Card
                  key={album.album_id}
                  style={{ width: 300 }}
                  cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                  actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description={album.notes}
                  />
                </Card>
                  ))
                }

              </TabPane>)
            ) 
          }
			  </Tabs>		    
		  </div>
		)
	}
} 

const mapStateToProps = state => ({
  category: state.category
})

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch({type: "CATEGORY_ALL_GET"})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
