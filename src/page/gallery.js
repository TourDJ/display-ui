import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

const namespace = 'gallery';

const mapStateToProps = (state) => {
    const pictureList = state(namespace);
    return {
        pictureList,
    };
}

export default class gallery extends Component {
    constructor(props) {
        super(props);
        this.counter = 10;
        this.state = {
            pictureList: [
                {
                    id: 1,
                    setup: 'Did you hear about the two silk worms in a race?',
                    punchline: 'It ended in a tie',
                },    
                {
                    id: 2,
                    setup: 'What happens to a frog\'s car when it breaks down?',
                    punchline: 'It gets toad away',
                },    
            ],
        }
    }

    addNew = () => {
        this.setState(prevState => {
            const prevPictureList = prevState.pictureList;
            this.counter += 1;
            const picture = {
                id: this.counter,
                setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
                punchline: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            }
            return {
                pictureList: prevPictureList.concat(picture),        
            }
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.pictureList.map(picture => {
                        return (
                            <Card key={picture.id}>
                                <div> Q: {picture.setup}</div>
                                <div>
                                    <strong>A: {picture.punchline}</strong>    
                                </div>
                            </Card>
                        )
                    })
                }
                <div>
                    <Button onClick={this.addNew}>添加照片</Button>
                </div>
            </div>
        )
    }
}   
