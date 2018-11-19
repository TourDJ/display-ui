import React, { PureComponent } from 'react'
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip, Button } from 'antd'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import Debounce from 'lodash-decorators/debounce'
// import Link from 'umi/link';
import NoticeIcon from '../NoticeIcon'
import styles from './index.less'

export default class CommonHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  render() {
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();

    return (
      <div className={styles.header}>
          {isMobile && [
            // <Link to="/" className={styles.logo} key="logo">
            //   <img src={logo} alt="logo" width="32" />
            // </Link>,
            <Divider type="vertical" key="line" />,
          ]}

          <div className={styles.logo}>
            Display
          </div>

          <div className={styles.right}>
            测试中文
          </div>

      </div>
    );
  }
}
