import React, { Component} from 'react';
import { connect } from 'react-redux';
import {Button, Icon, InputItem} from 'antd-mobile';
import './loginbyaccount.css'
import { Redirect} from 'react-router-dom';
import { login} from '../../../actions/index';

/**
 *  通过账户密码登录的组件页
 *
 * @class LoginByAccount
 * @extends {Component}
 */
class LoginByAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            showPassword: false,
            redirectToRegister: false
        };
        this.inputOnchange = this.inputOnchange.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.onRedirectToRegister = this.onRedirectToRegister.bind(this);
    }

    /**
     *  所有输入框输入内容时调用的方法
     *
     * @param {*} value  string 输入框中的内容
     * @param {*} type  string 要setState的值('account', 'password')
     * @memberof LoginByAccount
     */
    inputOnchange(value, type) {
        this.setState({[type]: value});
    }

    /**
     *  点击登录按钮时调用的方法
     *
     * @memberof LoginByAccount
     */
    onSubmitClick() {
        this.props.login(this.state.account);
    }

    /**
     *  点击眼睛时调用的方法
     *
     * @memberof LoginByAccount
     */
    toggleShowPassword() {
        // 点击眼睛时切换密码的明文和非明文显示方式
        this.state.showPassword ? this.setState({showPassword: false})
            : this.setState({showPassword: true});
    }

    /**
     *  点击右上角注册时调用的方法
     *
     * @memberof LoginByAccount
     */
    onRedirectToRegister() {
        // 让 Redirect 渲染出来，直接跳转到注册页
        this.setState({redirectToRegister: true});
    }

    render() {
        // 这个元素是通过 this.state.showPassword 来控制眼睛的显示icon，通过切换className来实现切换
        const passwordExtra = this.state.password
                ? <i className={`iconfont passwordeye ${this.state.showPassword? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang_o'}`}/>
                : null;

        return (
            <div className="accountloginwrapper">

                {/* 如果已登录直接跳转到首页 */}
                {this.props.logStatus.isLogin? <Redirect to="/"/> : null}

                {/* 如果点击了右上角的注册(redirectToRegister为true)直接跳注册页 */}
                {this.state.redirectToRegister? <Redirect to="/register"/> : null}

                {/* Header部分 */}
                <div className="acountloginheader">
                    <Icon type="left" size="lg"/>
                    <i className="login_by_account_header_register iconfont icon-zhuce" onClick={this.onRedirectToRegister}>注册新账号</i>
                </div>

                {/* Title部分 */}
                <div className="accountlogintitle">账号密码登录</div>

                {/* 账号输入框 */}
                <InputItem placeholder="请输入账号" clear="true" onChange={value=>this.inputOnchange(value, 'account')}>
                    <i className="iconfont icon-yonghutouxiang accountloginicon"></i>
                </InputItem>

                {/* 密码输入框 */}
                <InputItem placeholder="请输入密码" type={this.state.showPassword? 'text':'password'} 
                           onChange={value=>this.inputOnchange(value, 'password')} extra={passwordExtra}
                           onExtraClick={this.toggleShowPassword}
                           >
                    <i className="iconfont icon-mima accountloginicon"></i>
                </InputItem>

                {/* 登录按钮 */}
                <Button className="accountloginbutton" type="primary" onClick={this.onSubmitClick}>登录</Button>
            </div>
        )
    }
}

// 引入store中的state
const mapStateToProps = (state) => {
    return {logStatus: state.login}
}

// 引入需要的action
const actionCreater = { login};

// 把action和store一起通过props绑定到这个组件上
LoginByAccount = connect( mapStateToProps, actionCreater)(LoginByAccount);

export default LoginByAccount;