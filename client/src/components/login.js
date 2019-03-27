import React, { Component} from 'react'
import { connect } from 'react-redux';
import { login, logout} from '../actions/index'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <button onClick={this.props.login}>login</button>
                <button onClick={this.props.logout}>logout</button>
            </div>
        )
    }
}
const actionCreater = { login, logout};
Login = connect(actionCreater)(Login);

export default Login;