import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Avatar,
  Button,
  Card,  
  Divider,
  Form,  
  Icon, 
  Tabs, 
  Tag 
} from 'antd'
import CreateForm from './CreateForm'
import styles from './home.less'

const TabPane = Tabs.TabPane
const { Meta } = Card

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
    const form = this.formRef.props.form
    form.resetFields()
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

      saveAlbum();
      
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
          <Button icon="picture" className={styles.btn} onClick={this.showModal}>新建分类</Button>
          <Button type="primary" className={styles.btn} icon="picture" onClick={this.showModal}>新建相册</Button>
          <Button type="danger" className={styles.btn} icon="picture">删除相册</Button>
          <CreateForm
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
                  cover={<img alt="example" src="http://192.168.0.103:8020/images/jiefangxie.jpg" />}
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
  getCategories: () => dispatch({type: "CATEGORY_ALL_GET"}),
  saveAlbum: () => dispatch({type: "ALBUM_SAVE"}),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
