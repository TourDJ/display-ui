import React, { Component } from 'react';
import { Layout } from 'antd';
import CommonHeader from '../components/CommonHeader';
import NavigatorBar from '../components/CommonHeader/NavigatorBar'
import logo from '../assets/logo.svg';
import 'antd/dist/antd.css'

const { Content, Header, Footer } = Layout;

class BasicSkeleton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const { children, location } = this.props;

    return (
      <Layout>
          <Header style={{ padding: 0 }}>
            <CommonHeader
              logo={logo}
              user={{
                name: 'Jiefang',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                notifyCount: 12,
              }}
            />
          </Header>

          <Content style={{ margin: '24px 24px 0', height: '100%' }}>
            <NavigatorBar />

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

export default BasicSkeleton
