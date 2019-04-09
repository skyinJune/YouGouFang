import React, {Component} from 'react'
import {Icon} from 'antd-mobile';

/**
 *  用户卡片页组件
 *
 * @class UserCard
 * @extends {Component}
 */
class UserCard extends Component {
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
                UserCard
            </div>
        )
    }
}

export default UserCard;