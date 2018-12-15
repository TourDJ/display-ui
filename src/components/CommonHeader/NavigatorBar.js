import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { breadType, breadSizeType } from '../../actions/actionTypes'

//Bread crumb
class NavigatorBar extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // componentDidMount() {

  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.breadSize != prevProps.breadSize) {
  //     console.log('--ssss-')
  //   }
  // }

  //When click the crumb, link it
  //and meanwhile change the redux store data
  crumbsHandler = (e, key) => {
    this.props.dispatch({
      type: breadType['BREAD_POP'],
      payload: {
        key: key
      }
    })
    this.props.dispatch({
      type: breadSizeType['BREAD_SIZE_JUMP'],
      payload:this.props.bread.length()
    })
    console.log(this.props.bread.length())
  }

  produceBreadcrumbs() {
    const { bread } = this.props
    const crumbs = bread.dump()
    let crumbComp = []
    let linkComp, _this = this
    if(crumbs && crumbs.length > 0) {
      crumbs.map(function(crumb) {
        if(crumb.path && crumb.active)
          linkComp = <Link to={crumb.path}>{crumb.name}</Link>
        else
          linkComp = crumb.name
        crumbComp.push(
          <Breadcrumb.Item key={crumb.key} 
            onClick={(e) => _this.crumbsHandler(e, crumb.key)}>
            {linkComp}
          </Breadcrumb.Item>
        )
      })
    }
    return crumbComp
  }

  render() {
    const crumbComp = this.produceBreadcrumbs()

    return (
      <div>
        <Breadcrumb style={{ margin: '0 0 16px' }}>
          {crumbComp}
        </Breadcrumb>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bread: state.bread,
  breadSize: state.breadSize
})

const mapDispatchToProps = dispatch => ({
   dispatch: dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigatorBar)
