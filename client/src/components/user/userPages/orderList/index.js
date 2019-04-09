import React, {Component} from 'react'
import {Icon} from 'antd-mobile';

/**
 *  订单组件
 *
 * @class OrderList
 * @extends {Component}
 */
class OrderList extends Component {
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
                OrderList
            </div>
        )
    }
}

export default OrderList;