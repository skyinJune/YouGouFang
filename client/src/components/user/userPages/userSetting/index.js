import React, {Component} from 'react'
import {Icon} from 'antd-mobile';

class UserSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Icon type="left" size="lg" onClick={()=>this.props.history.goBack()}/>
                UserSetting
            </div>
        )
    }
}

export default UserSetting;