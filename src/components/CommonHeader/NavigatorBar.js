import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { trackStackType } from '../../actions/actionTypes'

//Bread crumb
class NavigatorBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crumbItem: null,
    }
  }

  componentDidMount() {
    this.getBreadCrumbItems()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.trackCurr != prevProps.trackCurr) {
      this.getBreadCrumbItems()
    }
  }

  getBreadCrumbItems = () => {
    const crumbItem = this.produceBreadcrumbs()
    this.setState({
      crumbItem,
    })
  }

  //When click the crumb, link it
  //and meanwhile change the redux store data
  crumbsHandler = (e, pathname, state) => {
    // this.props.dispatch({
    //   type: breadType['BREAD_POP'],
    //   payload: {
    //     key: key
    //   }
    // })
    // this.props.dispatch({
    //   type: breadSizeType['BREAD_SIZE_JUMP'],
    //   payload:this.props.bread.length()
    // })
    // console.log(this.props.bread.length())
    this.props.history.push(pathname, state) 
  }

  produceBreadcrumbs() {
    const { trackStack } = this.props
    console.log(trackStack.peek())
    const crumbs = trackStack.dump(false)
    let crumbComp = []
    let linkComp, _this = this
    if(crumbs && crumbs.length > 0) {
      crumbs.map(function(crumb) {
        if(crumb.path && crumb.visit)
          linkComp = <Link to={crumb.path}>{crumb.name}</Link>
        else
          linkComp = crumb.name

        crumbComp.push(
          <Breadcrumb.Item key={crumb.key} 
            onClick={(e) => _this.crumbsHandler(e, crumb.pathname, crumb.state)}>
            {linkComp}
          </Breadcrumb.Item>
        )
      })
    }
    return crumbComp
  }

  render() {
    const { crumbItem } = this.state

    return (
      <div>
        <Breadcrumb style={{ margin: '0 0 16px' }}>
          {crumbItem}
        </Breadcrumb>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // bread: state.bread,
  trackCurr: state.trackCurr,
  trackStack: state.trackStack
})

const mapDispatchToProps = dispatch => ({
   dispatch: dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigatorBar)
