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
        const UserType = this.props.basicInfo.userType? '中介' : '普通用户';
        const IsCertificationPassed = this.props.basicInfo.IsCertificationPassed? '已认证' : '认证中';
        const userStatusIcon = this.props.basicInfo.IsCertificationPassed? 
                'iconfont icon-webicon301 basicinfo_userStatus_icon'
                :'iconfont icon-renzhengshenhe basicinfo_userStatus_icon';
        return (
            <Link to="/usercenter/userCard">
            <div className="basicinfo_wrapper">
                <div className="basic_left_wrapper">
                    <div className="basicinfo_account">{this.props.basicInfo.account}</div>
                    <div className="basicinfo_introduction">{this.props.basicInfo.introduction}</div>
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
                        <img className="basicinfo_avatar" src={this.props.basicInfo.avatar} alt=""/>
                    </div>
                </div>
            </div>
            </Link>
        )
    }
}

export default BasicInfo;