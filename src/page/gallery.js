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
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryInitPictures`
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class gallery extends Component {
    componentDidMount() {
        this.props.onDidMount();
    }

    render() {
        {console.log(this.props.pictureList.length)}
        return (
            <div>
                {
                    this.props.pictureList.map(picture => {
                        {console.log(picture)}
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
            </div>
        )
    }
}   
