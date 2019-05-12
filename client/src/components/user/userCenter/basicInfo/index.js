import React, {Component} from 'react'
import './index.css'
import { Link} from 'react-router-dom';

/**
 *  用户基本信息组件
 *
 * @class BasicInfo
 * @extends {Component}
 */
class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const UserType = this.props.userInfo.userType? '中介' : '普通用户';
        const IsCertificationPassed = this.props.userInfo.IsCertificationPassed? '已认证' : '认证中';
        const userStatusIcon = this.props.userInfo.IsCertificationPassed? 
                'iconfont icon-webicon301 basicinfo_userStatus_icon'
                :'iconfont icon-renzhengshenhe basicinfo_userStatus_icon';
        return (
            <Link to="/userCard">
            <div className="basicinfo_wrapper">
                <div className="basic_left_wrapper">
                    <div className="basicinfo_account">{this.props.userInfo.account}</div>
                    <div className="basicinfo_introduction">{this.props.userInfo.introduction? this.props.userInfo.introduction:'你可以在这里写一段你的简介~'}</div>
                    <div className="basicinfo_userType_wrapper">
                        <div className="basicinfo_userType">
                            <i className="iconfont icon-yonghutouxiang basicinfo_userType_icon"/>{UserType}
                        </div>
                        <div className="basicinfo_userStatus">
                        <i className={userStatusIcon}/>
                            {IsCertificationPassed}
                        </div>
                    </div>
                </div>
                <div className="basic_right_wrapper">
                    <div className="basic_right_icon_wrapper">
                        <i className="iconfont icon-icon-- basic_right_icon"/>
                    </div>
                    <div className="basicinfo_avatar_wrapper">
                        <img className="basicinfo_avatar" src={this.props.userInfo.avatar} alt=""/>
                    </div>
                </div>
            </div>
            </Link>
        )
    }
}

export default BasicInfo;