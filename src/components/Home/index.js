import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Avatar,
  Button,
  Card,  
  Divider,
  Form,  
  Icon, List, 
  Tabs, Tooltip,
  Tag, Col, Row, Popconfirm, message 
} from 'antd'
import CreateCategoryForm from './CreateCategoryForm'
import CreateAlbumForm from './CreateAlbumForm'
import styles from './home.less'
import { categoryType, albumType } from '../../actions/actionTypes'
import { parseUpload } from '../../utils/uploadFile'
import '../../utils/constant'
import locale from '../../locales/zh'

const TabPane = Tabs.TabPane
const { Meta } = Card

//Home page
class Home extends PureComponent {
	constructor(props) {
		super(props)
    this.state = {
      categoryVisible: false,
    	albumVisible: false,
      activeTab: -1,
    }
    this.setAlbum = this.setAlbum.bind(this)
	}

	componentDidMount() {
    this.props.getCategories()
	}

  componentDidUpdate(prevProps, prevState) {
    //Initial loading categories
    if(this.props.category.length != prevProps.category.length) {
      this.tabCallback(this.props.category[0]._key)
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
      values.cover = parseUpload(values.cover)
      console.log('Received values of album form: ', values)

      this.props.saveAlbum(values, this.state.activeTab)

      form.resetFields()
      this.setState({ albumVisible: false })
    })
  }

	tabCallback = (key) => {
	  console.log("Current tab's key is: ", key)
    this.props.getAlbums(key)
    this.setState({
      activeTab: key
    })
	}

  setAlbum = (e) => {
    
  }

  photoView = (e, album) => {
    const key = album._key
    const name = album.title
    this.props.history.push(`/album/photo/view/${key}`, {name: name})
  }

  //Edit album, add, modify, delete photo
  photoEdit = (key) => {
    this.props.history.push(`/album/photo/${key}`)
  }

  //Delete album confirm
  confirmDelete = (key) => {
    this.props.dispatch({
      type: albumType['ALBUM_DELETE'], 
      key: key
    })
  }

	render() {
    const noCategory = ['没有分类']
    const noAlbum = ['没有相册']

		return (
		  <div>
        <div style={{ marginBottom: 16 }}>
          <Button icon="appstore" className={styles.btn} onClick={this.showCategoryModal}>新建分类</Button>
          <Button type="primary" className={styles.btn} icon="hdd" onClick={this.showAlbumModal}>新建相册</Button>
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
        {
          this.props.category.length > 0 ?
          <Tabs onChange={this.tabCallback} type="card">
            {     
              this.props.category.map(pane => (
                <TabPane tab={pane.name} key={pane._key}>
                  <div style={{marginBottom: 10}}>
                    <Tag color="#108ee9">{pane.description}</Tag>
                  </div>
                  <Divider />
                  {
                    this.props.albums.length > 0 ?
                    this.props.albums.map((album, index) => {
                      if(!album.cover) 
                        album.cover = {filePath: "/"}

                      return (
                        <Col key={album._key} xs={24} sm={12} md={8} lg={6} xl={6}>
                          <Card
                            hoverable
                            style={{ width: 300, marginBottom: 20 }}
                            cover={<img alt="example" src={`${constant.service_url}${album.cover.filepath}`} onClick={(e) => this.photoView(e, album)} />}
                            actions={[
                              <Tooltip title='相册编辑'>
                                <Icon type="setting" theme="filled" onClick={this.setAlbum} />
                              </Tooltip>,
                              <Tooltip title='相册删除'>
                                <Popconfirm title="确定要删除该相册吗?" 
                                      okText="确定" cancelText="取消"
                                      onConfirm={() => this.confirmDelete(album._key)}> 
                                  <Icon type="delete" theme="filled" />
                                </Popconfirm>
                              </Tooltip>, 
                              <Tooltip title='照片管理'>
                                <Icon type="edit" theme="filled" onClick={() => this.photoEdit(album._key)} />
                              </Tooltip>
                            ]}
                          >
                            <Meta
                              title={album.title}
                              description={album.description}
                            />
                          </Card>
                        </Col>
                      )
                    })
                    : <List style={{width:'10%', marginLeft: '45%'}}
                        itemLayout="horizontal"
                        dataSource={noAlbum}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                      />
                  }
                </TabPane>
              ))
            }            
          </Tabs>
          : <List style={{width:'10%', marginLeft: '45%'}}
              itemLayout="horizontal"
              dataSource={noCategory}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        }	    
		  </div>
		)
	}
} 

const mapStateToProps = state => ({
  category: state.category,
  albums: state.albums
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,

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
