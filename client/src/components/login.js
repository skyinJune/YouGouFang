import React, { Component} from 'react'
import { connect } from 'react-redux';
import {Button} from 'antd-mobile';
import { login, logout} from '../actions/index'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const logGreeting = this.props.logStatus.isLogin ? <h2>hello, {this.props.logStatus.user}</h2> 
        : <h2>hello, click to login</h2>;
        return (
            <div>
                {logGreeting}
                <Button type="primary" onClick={this.props.login}>login</Button>
                <Button type="warning" onClick={this.props.logout}>logout</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {logStatus: state.login}
}

const actionCreater = { login, logout};
Login = connect( mapStateToProps, actionCreater)(Login);

export default Login;