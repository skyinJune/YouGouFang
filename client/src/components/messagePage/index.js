import React, {Component} from 'react';
import io from 'socket.io-client'
import {Button, InputItem} from 'antd-mobile'

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
            messageVal: ''
        }
    }

    componentDidMount() {
        let socket = io('ws://127.0.0.1:4000');

        socket.emit('client message', {msg:'hi, server'});

        socket.on('connection',  ()=>{
            console.log('client connect server');
        });

        socket.on('disconnect', ()=>{
            console.log('client disconnect');
        });
    }

    render() {
        return (
            <div>
                <InputItem onChange={val=>this.setState({messageVal: val})}/>
                <Button type="primary" onClick={()=>console.log(this.state.messageVal)}>发送</Button>
            </div>
        )
    }
}

export default MessagePage;