import React, { Component} from 'react';
import { connect } from 'react-redux';
import {Button, Icon, InputItem} from 'antd-mobile';
import './loginbyaccount.css'
import { Redirect} from 'react-router-dom';
import { login} from '../../../actions/index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            showPassword: false
        };
        this.inputOnchange = this.inputOnchange.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
    }

    inputOnchange(value, type) {
        this.setState({[type]: value});
    }

    onSubmitClick() {
        this.props.login();
        console.log(this.state);
    }

    toggleShowPassword() {
        this.state.showPassword ? this.setState({showPassword: false})
            : this.setState({showPassword: true});
    }

    render() {
        const passwordExtra = this.state.password
                ? <i className={`iconfont passwordeye ${this.state.showPassword? 'icon-yanjing_kai' : 'icon-yanjing-bi'}`}/>
                : null;
        return (
            <div className="accountloginwrapper">
                {this.props.logStatus.isLogin? <Redirect to="/"/> : null}
                <div className="acountloginheader">
                    <Icon type="left" size="lg"/>
                </div>
                <div className="accountlogintitle">账号密码登录</div>
                <InputItem placeholder="请输入账号" clear="true" onChange={value=>this.inputOnchange(value, 'account')}>
                    <i className="iconfont icon-yonghutouxiang accountloginicon"></i>
                </InputItem>
                <InputItem placeholder="请输入密码" type={this.state.showPassword? 'text':'password'} 
                           onChange={value=>this.inputOnchange(value, 'password')} extra={passwordExtra}
                           onExtraClick={this.toggleShowPassword}
                           >
                    <i className="iconfont icon-mima accountloginicon"></i>
                </InputItem>
                <Button className="accountloginbutton" type="primary" onClick={this.onSubmitClick}>登录</Button>
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