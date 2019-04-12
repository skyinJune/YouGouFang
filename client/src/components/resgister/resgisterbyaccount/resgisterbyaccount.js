import React, {Component} from 'react';
import './registergyaccount.css';
import {Button, Icon, InputItem, Toast, Radio, List} from 'antd-mobile';
import { connect } from 'react-redux';
import { login} from '../../../actions/index';
import { Redirect} from 'react-router-dom';
import 'whatwg-fetch';

const RadioItem = Radio.RadioItem;

/**
 * 通过账户注册的组件页
 *
 * @class ResgisterByAccount
 * @extends {Component}
 */
class ResgisterByAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            confirmPassword: '',
            agentCode: '',
            showPassword: false,
            userType: 0
        };
        this.inputOnchange = this.inputOnchange.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.confirmPasswordToast = this.confirmPasswordToast.bind(this);
        this.switchUserType = this.switchUserType.bind(this);
        this.submitRegisterInfo = this.submitRegisterInfo.bind(this);
    };


    /**
     * 所有输入框输入内容时调用的方法
     *
     * @param {*} value string 输入框中的内容
     * @param {*} type  string 要setState的值('account', 'password', 'confirmPassword')
     * @memberof ResgisterByAccount
     */
    inputOnchange(value, type) {
        this.setState({[type]: value});
    }

    /**
     *  点击注册按钮时调用的方法
     *
     * @memberof ResgisterByAccount
     */
    onSubmitClick() {
        // 判断密码和确认密码是否都存在，否则Toast提示
        if(this.state.account && this.state.account && this.state.confirmPassword) {
            // 判断密码和确认密码是否一致，否则Toast提示
            if(this.state.password === this.state.confirmPassword) {
                // 注册
                if(this.state.userType) {
                    this.state.agentCode ? this.submitRegisterInfo()
                    : Toast.fail('注册中介用户必须输入中介认证编码,请输入后再次注册~')
                }
                else {
                    this.submitRegisterInfo();
                }
            }
            else {
                Toast.fail('密码输入不一致，请确认后再次输入~', 2);
            }
        }
        else {
            Toast.fail('账号呢？密码呢？检查一下重新注册吧~', 2);
        }
    }

    /**
     *  点击眼睛时调用的方法
     *
     * @memberof ResgisterByAccount
     */
    toggleShowPassword() {
        // 点击眼睛时切换密码的明文和非明文显示方式
        this.state.showPassword ? this.setState({showPassword: false})
            : this.setState({showPassword: true});
    }

    /**
     *  点击确认密码中的icon时调用的方法
     *
     * @memberof ResgisterByAccount
     */
    confirmPasswordToast() {
        // 点击确认密码中的提示icon,如果密码和确认密码一致则提示可注册，否则提示密码不一致
        this.state.password === this.state.confirmPassword?
            Toast.success('密码输入完成，快去点击注册吧~',2)
            :Toast.fail('密码输入不一致，请确认后再输入~',2)
    }

    /**
     *  点击不同的类型时调用的方法
     *
     * @param {*} value 0是普通用户，1是中介
     * @memberof ResgisterByAccount
     */
    switchUserType(value) {
        this.setState({userType: value})
    }

    /**
     *  生成新账户模型，发送registerbyaccount POST请求
     *
     * @memberof ResgisterByAccount
     */
    submitRegisterInfo() {
        // 按照数据库UserModel来定义,部分信息在注册时为默认值或空值,注册完成后可在个人中心更改
        const userJson = {
            account: this.state.account,
            passWord: this.state.password,
            userType: this.state.userType,
            agentCode: this.state.agentCode,
            phoneNumber: 0,
        };
        
        // 转换为Json字符串
        const data = JSON.stringify(userJson);
        
        Toast.loading('正在注册...');

        // 发送 registerbyaccount POST请求，注册新账号
        fetch('/registerbyaccount', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
          }).then(response => response.json())
          .then(data => {
            console.log(data);
            Toast.hide();
            this.props.login(this.state.account);
            // 注册成功后Toast提示，并且直接使用当前账户登录
            Toast.success(`注册成功! 新同学 ${this.state.account} 你好，已自动登录~`, 2);
          });
    }

    render() {

        // 这个元素是通过 this.state.showPassword 来控制眼睛的显示icon，通过切换className来实现切换
        const passwordExtra = this.state.password
                ? <i className={`iconfont register_by_account_passwordeye ${this.state.showPassword? 'icon-yanjing_xianshi_o' : 'icon-yanjing_yincang_o'}`}/>
                : null;
        
        // 这个元素是用来控制确认密码后面的Extra icon的显示样式的
        const confirmPasswordExtra = this.state.confirmPassword ? 
                (this.state.confirmPassword === this.state.password ?
                    <i className="iconfont icon-wancheng register_by_account_confirmOK"/>
                    :<i className="iconfont icon-warningo register_by_account_confirmErr"/>
                )
                :null;

        // 这个数组存储Radio中的信息
        const radioInfo = [
            { value: 0, label: '普通用户', extra: '享有查看浏览所有房源、发布房源的特权' },
            { value: 1, label: '中介', extra: '享有查看浏览所有房源、发布房源、受理中介业务的特权' },
            ];
        
        return (
            <div className="register_by_account_wrapper">

                {/* 如果已登录直接跳转到首页 */}
                {this.props.logStatus.isLogin? <Redirect to="/"/> : null}

                {/* Header部分 */}
                <div className="register_by_account_headIcon">
                    <Icon type="left" size="lg" onClick={()=>this.props.history.goBack()}/>
                    <i className="iconfont icon-shouji register_by_account_phoneIcon">手机号注册</i>
                </div>

                {/* Title部分 */}
                <div className='register_by_account_title'>注册新账号</div>

                {/* 账号输入框 */}
                <InputItem placeholder="请输入账号" clear="true" onChange={value=>this.inputOnchange(value, 'account')}>
                    <i className="iconfont icon-zhuce register_by_account_inputicon"></i>
                </InputItem>

                {/* 密码输入框 */}
                <InputItem placeholder="请输入密码" 
                        type={this.state.showPassword? 'text':'password'} 
                        onChange={value=>this.inputOnchange(value, 'password')} 
                        extra={passwordExtra}
                        onExtraClick={this.toggleShowPassword}
                        >
                    <i className="iconfont icon-mima register_by_account_inputicon"></i>
                </InputItem>

                {/* 确认密码输入框 */}
                {
                    // 当密码不为空时显示确认密码输入框
                    this.state.password?
                    <InputItem placeholder="请再次输入密码" type='password'
                            onChange={value=>this.inputOnchange(value, 'confirmPassword')} 
                            extra={confirmPasswordExtra}
                            onExtraClick={this.confirmPasswordToast}
                            >
                        <i className="iconfont icon-querenmima register_by_account_inputicon"></i>
                    </InputItem>
                    :null
                }

                {/* 注册类别选择 */}
                <div className="register_by_account_switchType">
                    {/* 用一个List包裹起来 */}
                    <List renderHeader={() => '选择注册类别'}>
                        {
                            // 把radioInfo中的对象都循环展示出来
                            radioInfo.map(i => (
                                <RadioItem key={i.value} checked={this.state.userType === i.value} onChange={()=>this.switchUserType(i.value)}>
                                    {i.label}

                                    {/* 当该RadioItem被选中时展示extra信息 */}
                                    {this.state.userType === i.value? <List.Item.Brief>{i.extra}</List.Item.Brief> :null}
                                </RadioItem>
                                ))
                        }
                    </List>
                </div>

                {
                    this.state.userType ? 
                        <InputItem placeholder="请输入中介认证编码"
                        onChange={value=>this.inputOnchange(value, 'agentCode')}
                        >
                            <i className="iconfont icon-yuzhuceqiye register_by_account_inputicon"></i>
                        </InputItem>
                    : null
                }

                {/* 注册按钮 */}
                <Button className="register_by_account_button" type="primary" onClick={this.onSubmitClick}>注册</Button>
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
ResgisterByAccount = connect( mapStateToProps, actionCreater)(ResgisterByAccount);

export default ResgisterByAccount;