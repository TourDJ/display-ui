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
  Row, Col, Popconfirm, message,
  Pagination
} from 'antd'
import CategoryCreate from './CategoryCreate'
import AlbumCreate from '../Album/AlbumCreate'
import { categoryType, albumType, tabType } from '../../actions/actionTypes'
import { parseUpload } from '../../utils/uploadFile'
import styles from './home.less'
import locale from '../../locales/zh'
import '../../utils/constant'

const TabPane = Tabs.TabPane
const { Meta } = Card

//Home page
class Home extends PureComponent {
	constructor(props) {
		super(props)
    this.state = {
      categoryVisible: false,
      current: 1,
    }
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

  pageChange = (page) => {
    this.setState({
      current: page,
    })
  }

  //Category form
  saveCategoryFormRef = (categoryFormRef) => {
    this.categoryFormRef = categoryFormRef
  }

  //显示新建分类窗口
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

	tabCallback = (key) => {
    const {dispatch} = this.props
	  console.log("Current tab's key is: ", key)
    dispatch({
        type: tabType['TAB_KEY'], 
        key: key
    })
    this.props.getAlbums(key)
	}

  //Create album
  createAlbum = (key) => {
    this.props.history.push(`/album/add`, {
      categoryKey: key
    })
  }

  //Edit album
  editAlbum = (album) => {
     this.props.history.push(`/album/edit`, {
      album: album
    })   
  }

  //View photo
  photoView = (e, album) => {
    const key = album._key
    const name = album.title
    this.props.history.push(`/album/photo/view/${key}`, {name: name})
  }

  //Add, modify, delete photo
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
          <CategoryCreate
            wrappedComponentRef={this.saveCategoryFormRef}
            visible={this.state.categoryVisible}
            onCancel={this.categoryHandleCancel}
            onCreate={this.categoryHandleCreate}
          />
        </div>	
        <Row>
        {
          this.props.category.length > 0 ?
          <Tabs onChange={this.tabCallback} type="card" activeKey={this.props.tabKey}>
            {     
              this.props.category.map(pane => (
                <TabPane tab={pane.name} key={pane._key}>
                  <Row style={{marginBottom: 10}}>
                    <Col xs={12}>
                    <Button type="primary" icon="hdd" className={styles.btn} 
                        onClick={() => this.createAlbum(this.props.tabKey)}
                    >
                      新建相册
                    </Button>
                    </Col>
                    <Col xs={12}>
                      <strong style={{marginLeft: 10, fontSize: 18}}>“{pane.description}”</strong>
                    </Col>
                  </Row>
                  <Divider />
                  <Row>
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
                                <Icon type="setting" theme="filled" onClick={() => this.editAlbum(album)} />
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
                  </Row>
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
        </Row>
        <Row>
          <Pagination 
            current={this.state.current} 
            pageSize={20}
            total={this.props.albums.length}
            showTotal={(total, range) => `总共 ${total} 条记录`}
            onChange={this.pageChange} />
        </Row>	    
		  </div>
		)
	}
} 

const mapStateToProps = state => ({
  category: state.category,
  albums: state.albums,
  tabKey: state.tabKey,
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
  })

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
