import React, { Component} from 'react';
import { connect } from 'react-redux';
import {Button, Icon, InputItem} from 'antd-mobile';
import './loginbyaccount.css'
import { Redirect} from 'react-router-dom';
import { login} from '../../../actions/index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="accountloginwrapper">
                {this.props.logStatus.isLogin? <Redirect to="/"/> : null}
                <div className="acountloginheader">
                    <Icon type="left" size="lg"/>
                    <Icon type="home" />
                </div>
                <div className="accountlogintitle">账号密码登录</div>
                <InputItem placeholder="请输入账号" clear="true">
                    <i className="iconfont icon-yonghutouxiang accountloginicon"></i>
                </InputItem>
                <InputItem placeholder="请输入密码" clear="true" type="password">
                    <i className="iconfont icon-mima accountloginicon"></i>
                </InputItem>
                <Button className="accountloginbutton" type="primary" onClick={this.props.login}>登录</Button>
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