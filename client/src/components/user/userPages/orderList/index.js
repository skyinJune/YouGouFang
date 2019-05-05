import React, {Component} from 'react'
import './index.css'
import CommonHeader from '../../../commonComponents/commonHeader'
import OrderCard from './orderCard'

/**
 *  订单列表
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
                <CommonHeader history={this.props.history} title="我的订单"/>
                <div className="orderList_content_wrapepr">
                   <OrderCard/>
                </div>
            </div>
        )
    }
}

export default OrderList;