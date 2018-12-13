import React, { PureComponent } from 'react'
import { 
  Spin, Tag, Menu, Icon, Dropdown, Avatar, Tooltip 
} from 'antd';
import styles from './index.less';

export default class TopHeadRight extends PureComponent {

  onMenuClick = () => {

  }

  render() {
    const {user} = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    )

    return (
      <div className={styles.right}>
        {user.name ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={user.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{user.name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    )
  }
}