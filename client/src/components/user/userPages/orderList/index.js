import React, {Component} from 'react'
import CommonHeader from '../../../commonComponents/commonHeader'
import OrderCard from './orderCard'
import {Toast, Modal} from 'antd-mobile'
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
        this.deleteOrder = this.deleteOrder.bind(this);
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

    deleteOrder(_id) {
        Modal.alert('删除订单','删除后订单将从列表中移除',
            [
                { text: '返回', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确认取消', onPress: () => {
                    let orderIndex = this.state.orderList.forEach((item, index)=>{
                        if(item.order_id === _id) {
                            return index
                        }
                    });
                    let orderList = this.state.orderList.splice(orderIndex, 1);
                    this.setState({orderList});

                    const orderListInfo = {
                        account: this.props.logInfo.user,
                        orderList
                    };
                    const data = JSON.stringify(orderListInfo);
                    fetch('/changeOrderList', {
                        method:'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body:data
                    }).then(response => response.json())
                }, },
            ]
        )
    }

    render() {
        return (
            <div>
                <CommonHeader history={this.props.history} title="我的订单"/>
                <div style={{'marginTop': '.35rem'}}>
                    {
                        this.state.orderList.map(item=>(
                            <OrderCard
                                key={item.order_id}
                                orderInfo={item}
                                history={this.props.history}
                                deleteOrder={_id=>this.deleteOrder(_id)}
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