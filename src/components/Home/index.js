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
  Tag, Col, Row
} from 'antd'
import CreateCategoryForm from './CreateCategoryForm'
import CreateAlbumForm from './CreateAlbumForm'
import styles from './home.less'
import { categoryType, albumType } from '../../actions/actionTypes'
import '../../utils/constant'

const TabPane = Tabs.TabPane
const { Meta } = Card

//Home page
class Home extends PureComponent {
	constructor(props) {
		super(props)
    this.state = {
      categoryVisible: false,
    	albumVisible: false,
      panes: [],
      albums: [],
      times: 0, //Nothing, just for update
      activeTab: -1,
    }
	}

	componentDidMount() {
		let getCategories = this.props.getCategories
    getCategories()
	}

  componentDidUpdate(prevProps) {
    //Initial loading categories
    if(this.props.category.length != prevProps.category.length) {
      let category = this.props.category
      this.setState({
        panes: category
      })
      this.tabCallback(category[0]._key)
    }

    //When add a album in category
    if(this.props.albums.length != prevProps.albums.length) {
      this.setState((state, props) => ({
        albums: this.props.albums,
        times: state.times + 1
      })) 
    }
  }

  //Category form
  saveCategoryFormRef = (categoryFormRef) => {
    this.categoryFormRef = categoryFormRef
  }

  showCategoryModal = () => {
    const form = this.categoryFormRef.props.form
    form.resetFields()
    this.setState({ categoryVisible: true })
  }

  categoryHandleCancel = () => {
    this.setState({ categoryVisible: false })
  }

  categoryHandleCreate = () => {
    const form = this.categoryFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Received values of category form: ', values)

      this.props.saveCategory(values)

      form.resetFields()
      this.setState({ categoryVisible: false })
    })
  }

  //Album form
  saveAlbumFormRef = (albumFormRef) => {
    this.albumFormRef = albumFormRef
  }

	showAlbumModal = () => {
    const form = this.albumFormRef.props.form
    form.resetFields()
    this.setState({ albumVisible: true })
  }

  albumHandleCancel = () => {
    this.setState({ albumVisible: false })
  }

  albumHandleCreate = () => {
    const form = this.albumFormRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      let _category = values.category

      values.category = _category.key
      values.cover = this.parseCover(values.upload)
      delete values.upload
      console.log('Received values of album form: ', values)

      this.props.saveAlbum(values, this.state.activeTab)

      form.resetFields()
      this.setState({ albumVisible: false })
    })
  }

  //re-organize cover object
  parseCover = (upload) => {
    let file = upload ? upload.file : null,
        cover
    if(file && file.status === "done") {
      let response = file.response
      cover = {
        filename: response.data.realName,
        filepath: response.data.filePath,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type,
        uid: file.uid
      }
    }
    return cover
  }

	tabCallback = (key) => {
	  console.log("Current tab's key is: ", key)
    this.props.getAlbums(key)
    this.setState({
      activeTab: key
    })
	}

	render() {
		return (
		  <div>
        <div style={{ marginBottom: 16 }}>
          <Button icon="appstore" className={styles.btn} onClick={this.showCategoryModal}>新建分类</Button>
          <Button type="primary" className={styles.btn} icon="picture" onClick={this.showAlbumModal}>新建相册</Button>
          <CreateCategoryForm
            wrappedComponentRef={this.saveCategoryFormRef}
            visible={this.state.categoryVisible}
            onCancel={this.categoryHandleCancel}
            onCreate={this.categoryHandleCreate}
          />
          <CreateAlbumForm
	          wrappedComponentRef={this.saveAlbumFormRef}
	          visible={this.state.albumVisible}
	          onCancel={this.albumHandleCancel}
	          onCreate={this.albumHandleCreate}
            activeKey={this.state.activeTab}
	        />
        </div>		    
        <Tabs onChange={this.tabCallback} type="card">
          {
            this.state.panes.map(pane => (
              <TabPane tab={pane.name} key={pane._key}>
                <div style={{marginBottom: 10}}>
                  <Tag color="#108ee9">{pane.description}</Tag>
                </div>
                <Divider />
                {
                  this.state.albums.map((album, index) => (
                    <Col key={album._key} span={6} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Card
                      style={{ width: 300, marginBottom: 20 }}
                      cover={<img alt="example" src={`${constant.service_url}${album.cover.filepath}`} />}
                      actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    >
                      <Meta
                        title={album.title}
                        description={album.description}
                      />
                    </Card>
                    </Col>
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
  category: state.category,
  albums: state.albums
})

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch({
    type: categoryType['CATEGORY_ALL_GET']
  }),

  saveCategory: (category) => dispatch({
    type: categoryType['CATEGORY_SAVE'],
    category: category
  }),

  getAlbums: (category) => dispatch({
    type: albumType['ALBUM_GET'],
    category: category
  }),

  saveAlbum: (album, activeTab) => dispatch({
    type: albumType['ALBUM_SAVE'], 
    album: album,
    activeTab: activeTab
  })

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
