import React, {Component} from 'react'
import './index.css'
import CommonHeader from '../../../commonComponents/commonHeader'
import OrderCard from './orderCard'
import {Toast} from 'antd-mobile'
import { connect } from 'react-redux'

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
            orderList: []
        };

        this.getOrderList = this.getOrderList.bind(this);
    }

    componentDidMount() {
        if(this.props.logInfo.isLogin) {
            this.getOrderList();
        }
        else {
            this.props.history.push('/login');
        }
    }

    getOrderList() {
        // 发送请求时的加载态
        Toast.loading('加载订单列表数据...');

        const userInfo = {
            account: this.props.logInfo.user
        };

        // 转换为Json字符串
        const data = JSON.stringify(userInfo);

        fetch('/getUserInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
        }).then(response => response.json())
        .then(data=>{
            let orderList = data.orderList;
            this.setState({orderList});
            Toast.hide();
        })
    }

    render() {
        return (
            <div>
                <CommonHeader history={this.props.history} title="我的订单"/>
                <div className="orderList_content_wrapepr">
                    {
                        this.state.orderList.map(item=>(
                            <OrderCard
                                key={item.order_id}
                                orderInfo={item}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

// 从redux中取出登录信息
const mapStateToProps = (state) => {
    return {
        logInfo: state.login
    }
  }

//   将登录信息以props的形式传入
OrderList = connect(mapStateToProps)(OrderList);

export default OrderList;