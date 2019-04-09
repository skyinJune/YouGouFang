import React, {Component} from 'react'
import {Icon} from 'antd-mobile';

/**
 *  用户设置页组件
 *
 * @class UserSetting
 * @extends {Component}
 */
class UserSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                {/* 点击返回 */}
                <Icon type="left" size="lg" onClick={()=>this.props.history.goBack()}/>
                UserSetting
            </div>
        )
    }
}

export default UserSetting;