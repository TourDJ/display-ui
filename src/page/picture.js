import React, { Component } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import { Card, Icon, message } from 'antd';

class PicturesPage extends Component {
  componentDidMount() {
    this.queryList();
  }

  queryList = () => {
    this.props.dispatch({
      type: 'pictures/queryList',
    });
  };

  deleteOne = (id) => {
    this.props.dispatch({
      type: 'pictures/deleteOne',
      payload: id,
    }).then(() => {
      message.success('delete success, refresh');
      this.queryList();
    });
  };

  render() {
    const { pictureList = [] } = this.props;
    console.log('pictureList');
    console.log(pictureList);

    return (
      <div>
        {pictureList.map(v => <Card
          key={v.id}
          title={v.name}
          style={{ width: 300, marginBottom: '16px' }}
          extra={<Icon type={'delete'} onClick={() => this.deleteOne(v.id)} />}
        >{v.desc}</Card>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    pictureList: state.pictures.pictureList,
  };
}

export default connect(mapStateToProps)(PicturesPage);

// TODO replace antd Card with own Card.
