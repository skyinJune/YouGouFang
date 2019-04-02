import React, {Component} from 'react';
import './registergyaccount.css';
import {Button, Icon, InputItem, Toast} from 'antd-mobile';
import { connect } from 'react-redux';
import { login} from '../../../actions/index';
import { Redirect} from 'react-router-dom';

class ResgisterByAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            confirmPassword: '',
            showPassword: false
        };
        this.inputOnchange = this.inputOnchange.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.confirmPasswordToast = this.confirmPasswordToast.bind(this);
    };

    inputOnchange(value, type) {
        this.setState({[type]: value});
    }

    onSubmitClick() {
        if(this.state.password === this.state.confirmPassword) {
            Toast.success(`注册成功! ${this.state.account}同学你已登录!`, 2);
            this.props.login(this.state.account);
        }
        else {
            Toast.fail('密码输入不一致，请确认后再输入！', 2);
        }
    }

    toggleShowPassword() {
        this.state.showPassword ? this.setState({showPassword: false})
            : this.setState({showPassword: true});
    }

    confirmPasswordToast() {
        this.state.password === this.state.confirmPassword?
            Toast.success('密码输入完成，快去点击注册吧！',2)
            :Toast.fail('密码输入不一致，请确认后再输入！',2)
    }

    render() {
        const passwordExtra = this.state.password
                ? <i className={`iconfont register_by_account_passwordeye ${this.state.showPassword? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang_o'}`}/>
                : null;
        const confirmPasswordExtra = this.state.confirmPassword ? 
                (this.state.confirmPassword === this.state.password ?
                    <i className="iconfont icon-wancheng register_by_account_confirmOK"/>
                    :<i className="iconfont icon-warningo register_by_account_confirmErr"/>
                )
                :null;
        return (
            <div className="register_by_account_wrapper">
                {this.props.logStatus.isLogin? <Redirect to="/"/> : null}
                <div className="register_by_account_headIcon">
                    <Icon type="left" size="lg"/>
                    <i className="iconfont icon-shouji register_by_account_phoneIcon">手机号注册</i>
                </div>
                <div className='register_by_account_title'>注册新账号</div>
                <InputItem placeholder="请输入账号" clear="true" onChange={value=>this.inputOnchange(value, 'account')}>
                    <i className="iconfont icon-yonghutouxiang register_by_account_inputicon"></i>
                </InputItem>
                <InputItem placeholder="请输入密码" 
                        type={this.state.showPassword? 'text':'password'} 
                        onChange={value=>this.inputOnchange(value, 'password')} 
                        extra={passwordExtra}
                        onExtraClick={this.toggleShowPassword}
                        >
                    <i className="iconfont icon-mima register_by_account_inputicon"></i>
                </InputItem>
                {
                    this.state.password?
                    <InputItem placeholder="请再次输入密码" type='password'
                            onChange={value=>this.inputOnchange(value, 'confirmPassword')} 
                            extra={confirmPasswordExtra}
                            onExtraClick={this.confirmPasswordToast}
                            >
                        <i className="iconfont icon-mima register_by_account_inputicon"></i>
                    </InputItem>
                    :null
                }
                <Button className="accountloginbutton" type="primary" onClick={this.onSubmitClick}>注册</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {logStatus: state.login}
}

const actionCreater = { login};
ResgisterByAccount = connect( mapStateToProps, actionCreater)(ResgisterByAccount);

export default ResgisterByAccount;