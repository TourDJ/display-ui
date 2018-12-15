import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Avatar,
  Button,
  Card,  
  Divider,
  Modal, Icon, 
  Tabs, List,
  Tag, Col, Row, Popconfirm, message,
  Tooltip, Input,
  Pagination
} from 'antd'
import PageHead from '../CommonHeader/PageHead'
import PhotoEdit from './PhotoEdit'
import { breadType, breadSizeType } from '../../actions/actionTypes'
import { photoGet, crumbDispatch } from '../../actions'
import styles from './photo.less'

const { Meta } = Card

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize)
}

class Photo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      currPhoto: {},
      current: 1
    }
  }

  componentDidMount() {
    const { match } = this.props
    this.props.dispatch(photoGet(match.params.key))
  }

  componentDidUpdate(prevProps) {
    if(prevProps.photos.length != this.props.photos.length) {

    }
  }

  addPhoto() {
    const { match } = this.props
    crumbDispatch(this.props.dispatch, {
      breadType: breadType['BREAD_PUSH'], 
      breadData: {
        name: '添加照片',
        path: '/photo/add',
        active: false
      }, 
      breadSizeType: breadSizeType['BREAD_SIZE_ADD']
    })
    this.props.history.push('/photo/add', {albumKey: match.params.key})
  }

  //Edit photo's description
  editPhoto = (photo) => {
    crumbDispatch(this.props.dispatch, {
      breadType: breadType['BREAD_PUSH'], 
      breadData: {
        name: '照片编辑',
        path: '/photo/edit',
        active: false
      }, 
      breadSizeType: breadSizeType['BREAD_SIZE_ADD']
    })
    this.props.history.push('/photo/edit', {photo: photo})
  }

  //Delete photo confirm
  confirmDelete = (key) => {
    this.props.dispatch({
      type: photoType['PHOTO_DELETE'], 
      key: key
    })
  }

  pageChange = (page) => {
    this.setState({
      current: page,
    })
  }

  render() {
    const noPhoto = ['没有照片']

    return (
      <div>
        <PageHead icon="setting" title="照片管理" history={this.props.history} />
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon="photo" className={styles.btn} 
              onClick={this.addPhoto.bind(this)}>添加照片</Button>
        </div>
        <Row>
        {
          this.props.photos.length > 0 ?
          this.props.photos.map(pic => {
            return (
              <Col key={pic._key} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  className={styles.photoEditCard}
                  title={`${pic.title}`}
                  extra={`${pic.place}/${pic.date}`}
                  cover={<img src={`${constant.service_url}${pic.photo.filepath}`} width="100%" />}
                  actions={[
                    <Icon type="setting" theme="filled" onClick={() => this.editPhoto(pic)} />,
                    <Popconfirm title="确定要删除该照片吗?" 
                          okText="确定" cancelText="取消"
                          onConfirm={() => this.confirmDelete(pic._key)}> 
                      <Icon type="delete" theme="filled" />
                    </Popconfirm>
                  ]}                  
                >
                  <Meta className={styles.photoEditDiv} 
                        description={pic.description}/>
                </Card>
              </Col>
            )
          })
          : <List className={styles.photoNoData}
              itemLayout="horizontal"
              dataSource={noPhoto}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        }
        </Row>
        <Row>
          <Pagination 
            className={styles.page}
            current={this.state.current} 
            pageSize={20}
            total={this.props.photos.length}
            showTotal={(total, range) => `总共 ${total} 条记录`}
            onChange={this.pageChange} />
        </Row>
      </div>
    )   
  }
}

const mapStateToProps = state => ({
  photos: state.photos
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photo)
