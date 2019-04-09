import React, {Component} from 'react'
import {Icon} from 'antd-mobile';

/**
 *  用户安全中心组件
 *
 * @class UserSafety
 * @extends {Component}
 */
class UserSafety extends Component {
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
                UserSafety
            </div>
        )
    }
}

export default UserSafety;