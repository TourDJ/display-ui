import React , { PureComponent } from 'react'
import { Tabs, Button, Modal, Form, Input, Radio } from 'antd'
import 'antd/dist/antd.css'

const TabPane = Tabs.TabPane
const FormItem = Form.Item

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
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
      );
    }
  }
)


class Home extends PureComponent {
	constructor(props) {
		super(props)
    this.state = {
    	visible: false,
    }
	}


	showModal = () => {
    this.setState({ visible: true });
  }


  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

	callback = (key) => {
	  console.log(key);
	}

	render() {
		return (
		  <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon="picture" onClick={this.showModal}>新增相册</Button>
          <CollectionCreateForm
	          wrappedComponentRef={this.saveFormRef}
	          visible={this.state.visible}
	          onCancel={this.handleCancel}
	          onCreate={this.handleCreate}
	        />
        </div>		    
        <Tabs onChange={this.callback} type="card">
			    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
			    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
			    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
			  </Tabs>		    
		  </div>
		)
	}
} 

export default Home
