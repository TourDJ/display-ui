import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';

const namespace = 'gallery';

const mapStateToProps = (state) => {
    const pictureList = state[namespace].data;
    return {
        pictureList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: (newPicture) => {
            const action = {
                type: `${namespace}/addNewPicture`,
                payload: newPicture,
            };
            dispatch(action);
        },
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class gallery extends Component {
    render() {
        return (
            <div>
                {
                    this.props.pictureList.map(picture => {
                        return (
                            <Card key={picture.id}>
                                <div> Q: {picture.setup}</div>
                                <div>
                                    <strong>A: {picture.punchline}</strong>    
                                </div>
                            </Card>
                        );
                    })
                }
                <div>
                    <Button onClick={() => this.props.onClickAdd({
                        setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                        punchline: 'here we use dva',
                    })}>添加照片</Button>
                </div>
            </div>
        )
    }
}   
