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
import { 
  categoryType, albumType, tabType, 
  trackStackType
} from '../../actions/actionTypes'
import { trackCurrDispatch, trackDispatch } from '../../actions'
import styles from './home.less'
import locale from '../../locales/locale'
import '../../utils/constant'

const TabPane = Tabs.TabPane
const { Meta } = Card

//Home page of the applicaton, which contains all categories
//and all albums of respective category
class Home extends PureComponent {
	constructor(props) {
		super(props)
    this.state = {
      categoryVisible: false,
      current: 1,
    }
	}

	componentDidMount() {
    console.log(this.props)
    const { history, dispatch, trackCurr } = this.props
    //The first load of location has no key
    let _key_ = history.location.key
    if(!_key_ && history.location.pathname == "/")
      _key_ = 'home'

    //Track the history
    trackDispatch(dispatch, history, trackCurr)
    trackCurrDispatch(dispatch, _key_)

    //Get all categories
    this.props.getCategories()
  
	}

  componentDidUpdate(prevProps, prevState) {
    //Initial loading categories
    if(this.props.category.length != prevProps.category.length) {
      this.tabCallback(this.props.category[0]._key)
    }

  }

  //Save the reference of category modal of create form
  saveCategoryFormRef = (categoryFormRef) => {
    this.categoryFormRef = categoryFormRef
  }

  //Show the category modal create form
  showCategoryModal = () => {
    const form = this.categoryFormRef.props.form
    form.resetFields()
    this.setState({ categoryVisible: true })
  }

  //Cancel handle of category create
  categoryHandleCancel = () => {
    this.setState({ categoryVisible: false })
  }

  //Ok handle of category create
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

  //Category tab change handle
  tabCallback = (key) => {
    const {dispatch} = this.props
    console.log("Current tab's key is: ", key)
    dispatch({
        type: tabType['TAB_KEY'], 
        key: key
    })
    this.props.getAlbums(key)
  }

  //Pagination change handle
  pageChange = (page) => {
    this.setState({
      current: page,
    })
  }

  //Create album handle
  createAlbum = (key) => {
    this.props.history.push(`/album/add`, {
      categoryKey: key
    })
  }

  //Edit album handle
  editAlbum = (album) => {
    this.props.history.push(`/album/edit`, {
      album: album
    })   
  }

  //View photo handle
  photoView = (e, album) => {
    const key = album._key
    const name = album.title
    this.props.history.push(`/album/photo/view/${key}`, {name: name})
  }

  //Manage photo handle, which include add or modify or delete photo
  photoManage = (key) => {
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
    const noCategory = [ locale['category.data.no'] ]
    const noAlbum = [ locale['album.data.no'] ]

		return (
		  <div>
        <div style={{ marginBottom: 16 }}>
          <Button icon="appstore" className={styles.btn} onClick={this.showCategoryModal}>
            {locale['category.button.add']}
          </Button>
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
                      {locale['album.button.add']}
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
                            headStyle={{height: 300}}
                            cover={<img alt="example" src={`${constant.service_url}${album.cover.filepath}`} 
                                  onClick={(e) => this.photoView(e, album)} />}
                            actions={[
                              <Tooltip title={locale['album.tooltip.edit']}>
                                <Icon type="setting" theme="filled" onClick={() => this.editAlbum(album)} />
                              </Tooltip>,
                              <Tooltip title={locale['album.tooltip.delete']}>
                                <Popconfirm title={locale['album.tooltip.delete.confirm.title']} 
                                      okText={locale['album.tooltip.delete.confirm.ok']} 
                                      cancelText={locale['album.tooltip.delete.confirm.cancel']}
                                      onConfirm={() => this.confirmDelete(album._key)}> 
                                  <Icon type="delete" theme="filled" />
                                </Popconfirm>
                              </Tooltip>, 
                              <Tooltip title={locale['album.tooltip.manage']}>
                                <Icon type="edit" theme="filled" onClick={() => this.photoManage(album._key)} />
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
            showTotal={(total, range) => {
                return locale['album.pagination.total.before'] + 
                ` ${total} ` + 
                locale['album.pagination.total.after']
              }
            }
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
  trackCurr: state.trackCurr
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
