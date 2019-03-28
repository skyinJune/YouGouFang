import React, { Component} from 'react'
import { connect } from 'react-redux';
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
                <button onClick={this.props.login}>login</button>
                <button onClick={this.props.logout}>logout</button>
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