import React, {Component} from 'react'
import './index.css'
import {List} from 'antd-mobile'

class OrderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: {},
            orderType: '',
            houseInfo: {}
        }
        this.fetchOrderInfo = this.fetchOrderInfo.bind(this);
        this.fetchHouseInfo = this.fetchHouseInfo.bind(this);
    }

    componentDidMount() {
        this.fetchOrderInfo(this.props.orderInfo);
    }

    fetchOrderInfo(orderInfo) {

        const order = {
            _id: orderInfo.order_id
        };

        // 转换为Json字符串
        const data = JSON.stringify(order);

        fetch('/getOrderInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
        }).then(response => response.json())
        .then(data=>{
            this.fetchHouseInfo(data.house_id);
            this.setState({orderInfo: data, orderType: orderInfo.type});
        })
    }

    fetchHouseInfo(_id) {
        const houseInfo = {
            _id: _id
        };
        const data = JSON.stringify(houseInfo);
        fetch('/getHouseInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
        }).then(response => response.json())
        .then(data=>{
            this.setState({houseInfo: data})
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="orderCard_wrapper">
                {
                    Object.keys(this.state.orderInfo).length&&Object.keys(this.state.houseInfo).length?
                    <List>
                        <List.Item>
                            <div className="orderCard_main_wrapper">
                                <div className="orderCard_mainImg_wrapper">
                                    <img className="orderCard_mainImg" src={this.state.houseInfo.imageURLs[0]} alt=""/>
                                </div>
                                <div className="orderCard_info_wrapper">
                                    <div className="orderCard_info_title">{this.state.houseInfo.title}</div>
                                    <div className="orderCard_info_address">
                                        <i className="iconfont icon-dingwei"/>
                                        {this.state.houseInfo.position.address}
                                    </div>
                                    <div className="orderCard_info_time">
                                        {(new Date(this.state.orderInfo.bookingDate)).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    </List>
                    :null
                }
            </div>
        )
    }
}

export default OrderCard