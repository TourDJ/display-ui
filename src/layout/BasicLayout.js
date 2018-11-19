import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import CommonHeader from "../components/CommonHeader";
import logo from '../assets/logo.svg';

const { Content, Header, Footer } = Layout;

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
              <CommonHeader
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
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              { children }
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Display ©2018 Created by Hank Jiefang
          </Footer>          
      </Layout>
    );
  }
}

export default BasicLayout;
