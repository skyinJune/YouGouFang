import React, { Component} from 'react'
import { connect } from 'react-redux';
import {Button} from 'antd-mobile';
import {Link, Redirect} from 'react-router-dom'
import { login} from '../actions/index'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const logGreeting = this.props.logStatus.isLogin
        ? <h2>hello, {this.props.logStatus.user}, <Link to="/">go to home page</Link></h2> 
        : <h2>hello, click to login</h2>;
        return (
            <div>
                {this.props.logStatus.isLogin? <Redirect to="/"/> : null}
                {logGreeting}
                <Button type="primary" onClick={this.props.login}>login</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {logStatus: state.login}
}

const actionCreater = { login};
Login = connect( mapStateToProps, actionCreater)(Login);

export default Login;