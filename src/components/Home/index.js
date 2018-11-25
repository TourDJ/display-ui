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
import { categoryType, albumType } from '../../actions/actionTypes'
import '../../utils/constant'

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

  componentDidUpdate(prevProps) {
    if(this.props.category.length != prevProps.category.length) {
      let category = this.props.category
      this.setState({
        panes: category
      })
    }
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

      values.cover = this.parseCover(values.upload)
      delete values.upload
      console.log('Received values of form: ', values)

      this.props.saveAlbum(values);
      
      form.resetFields()
      this.setState({ visible: false })
    })
  }

  //re-organize cover object
  parseCover = (upload) => {
    let file = upload ? upload.file : null,
        cover
    if(file && file.status === "done") {
      let response = file.response
      cover = {
        filename: response.result.realName,
        filepath: response.result.filePath,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type,
        uid: file.uid
      }
    }
    return cover
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
                  cover={<img alt="example" src={`${constant.service_url}/images/jiefangxie.jpg`} />}
                  actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                  <Meta
                    title="Card title"
                    description={album.notes}
                  />
                </Card>
                  ))
                }

              </TabPane>
            ))
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
  getCategories: () => dispatch({type: categoryType['CATEGORY_ALL_GET']}),
  saveAlbum: (album) => dispatch({type: albumType['ALBUM_SAVE'], album: album}),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
