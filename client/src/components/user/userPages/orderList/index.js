import React, {Component} from 'react'
import {Icon} from 'antd-mobile';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Icon type="left" size="lg" onClick={()=>this.props.history.goBack()}/>
                OrderList
            </div>
        )
    }
}

export default OrderList;