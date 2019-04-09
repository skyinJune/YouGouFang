import React, {Component} from 'react'
import {Icon} from 'antd-mobile';

/**
 *  我发布的组件
 *
 * @class HouseList
 * @extends {Component}
 */
class HouseList extends Component {
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
                HouseList
            </div>
        )
    }
}

export default HouseList;