import React , { PureComponent } from 'react'
import { connect } from 'react-redux'
import { 
  Card, 
  Divider, 
  List, 
  Col,
  Icon
} from 'antd'
import { photoGet } from '../../actions'

const { Meta } = Card;

class ViewPhoto extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      albumKey: this.props.match.params.key,
      pics: []
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(photoGet(this.state.albumKey))
  }

  componentDidUpdate(prevProps) {
    if(prevProps.photos.length != this.props.photos.length) {
      this.setState({
        pics: this.props.photos
      })
    }
  }

  render() {
    const { match } = this.props
    const noPhoto = ['没有照片']

    return (
      <div>
        <Divider />
        {
          this.state.pics.length > 0 ?
          this.state.pics.map(pic => {
            return (
              <Col key={pic._key} span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  style={{ width: '100%', marginBottom: 20 }}
                  title={pic.title} bordered={false}
                  actions={[<Icon type="like" />, <Icon type="dislike" />]}
                >
                  <img src={`${constant.service_url}${pic.photo.filepath}`} width="100%" />
                  <Meta
                    style={{marginTop:'10px'}}
                    title={`${pic.place}/${pic.date}`}
                    description={pic.description}
                  />
                </Card>
              </Col>
            )
          })
          : <List style={{width:'10%', marginLeft: '45%'}}
              itemLayout="horizontal"
              dataSource={noPhoto}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        }
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
)(ViewPhoto)