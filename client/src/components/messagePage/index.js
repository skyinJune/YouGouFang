import React, {Component} from 'react';
import io from 'socket.io-client'
import {Button, InputItem, List} from 'antd-mobile'
const socket = io('ws://127.0.0.1:4000');

/**
 *  消息页的组件
 *
 * @class MessagePage
 * @extends {Component}
 */
class MessagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageVal: '',
            receiveMessage: []
        }
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        socket.on('receive message', (data) => {
            this.setState({receiveMessage: [...this.state.receiveMessage, data.msg]})
        });
    }

    sendMessage() {
        socket.emit('client message', {msg: this.state.messageVal});
        this.setState({messageVal: ''});
    }

    render() {
        return (
            <div>
                <InputItem value={this.state.messageVal} onChange={val=>this.setState({messageVal: val})}/>
                <Button type="primary" onClick={()=>this.sendMessage()}>发送</Button>
                <List>
                    {
                        this.state.receiveMessage.map((item, index)=>(
                            <List.Item
                                key={item + index}
                            >
                                {item}
                            </List.Item>
                        ))
                    }
                </List>
            </div>
        )
    }
}

export default MessagePage;