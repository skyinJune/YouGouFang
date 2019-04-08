import React, {Component} from 'react'
import {Icon} from 'antd-mobile';

class UserSafety extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Icon type="left" size="lg" onClick={()=>this.props.history.goBack()}/>
                UserSafety
            </div>
        )
    }
}

export default UserSafety;