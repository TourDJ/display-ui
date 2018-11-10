import React, { Component } from 'react';
import { Layout } from 'antd';
import GlobalHeader from "../component/GlobalHeader";
import logo from '../assets/logo.svg';

const { Content, Header } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout>
          <Header style={{ padding: 0 }}>
              <GlobalHeader
                logo={logo}
                collapsed={collapsed}
                currentUser={{
                  name: 'Jiefang',
                  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                  userid: '00000001',
                  notifyCount: 12,
                }}
                onCollapse={this.handleMenuCollapse}
              />
          </Header>

          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
              { children }
          </Content>
      </Layout>
    );
  }
}

export default BasicLayout;
