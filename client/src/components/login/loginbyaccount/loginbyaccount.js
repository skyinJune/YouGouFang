import React, { Component} from 'react';
import { connect } from 'react-redux';
import {Button, Icon, InputItem, Toast} from 'antd-mobile';
import './loginbyaccount.css'
import { Redirect} from 'react-router-dom';
import { login} from '../../../actions/index';
import 'whatwg-fetch';

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
        };
        this.inputOnchange = this.inputOnchange.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.submitLogInfo = this.submitLogInfo.bind(this);
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
        if(this.state.account && this.state.password) {
            this.submitLogInfo();
        }
        else {
            Toast.fail('账号呢？密码呢？再检查一下重新登录吧~', 2);
        }
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

    submitLogInfo() {
        // 将用户输入的账号密码打包成对象
        const logInfo = {
            account: this.state.account,
            passWord: this.state.password
        };

        // 转换为Json字符串
        const data = JSON.stringify(logInfo);

        Toast.loading('正在登录...');

        fetch('/loginbyaccount', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
          }).then(response => response.json())
          .then(data => {
            Toast.hide();
            if(data.checkStatus === 'OK') {
                this.props.login(this.state.account);
            }
            else if(data.checkStatus === 'Fail') {
                Toast.fail('密码或账号错误！请检查确认后重新登录~', 2);
            }
            else if(data.accountStatus === 'NotExist') {
                Toast.fail(`账号 ${data.account} 还未注册,请移步右上角注册~`, 2);
            }
          });
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

                {/* Header部分 */}
                <div className="acountloginheader">
                    <Icon type="left" size="lg" onClick={()=> this.props.history.push('/')}/>
                    <i className="login_by_account_header_register iconfont icon-zhuce" onClick={()=> this.props.history.push('/register')}>注册新账号</i>
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