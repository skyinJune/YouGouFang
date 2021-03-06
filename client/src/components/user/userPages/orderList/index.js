import React, {Component} from 'react'
import CommonHeader from '../../../commonComponents/commonHeader'
import OrderCard from './orderCard'
import {Modal, PullToRefresh} from 'antd-mobile'
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
            orderList: [],
            isLoading: true,
            refreshing: false,
            height: document.documentElement.clientHeight - 35,
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
        this.setState({isLoading: true});
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
            let orderList = data.orderList.reverse();
            this.setState({orderList, isLoading: false, refreshing: false});
        })
    }

    deleteOrder(_id) {
        Modal.alert('删除订单','删除后订单将从列表中移除',
            [
                { text: '返回', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确认删除', onPress: () => {
                    let orderList = this.state.orderList;
                    let orderIndex = 0;
                    orderList.forEach((item, index)=>{
                        if(item.order_id === _id) {
                            orderIndex = index
                        }
                    });
                    orderList.splice(orderIndex, 1);
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
                <CommonHeader history={this.props.history} title="我的订单" to="/userCenter"/>
                <div style={{'marginTop': '.35rem'}}>
                    <PullToRefresh
                        damping={60}
                        indicator="下拉可以刷新"
                        direction="down"
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            this.getOrderList();
                          }}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                            }}
                    >
                        {
                            this.state.isLoading? 
                            <div className="recommend_loading_wrapper">
                                <div className="recommend_loading_img_wrapper">
                                    <img className="recommend_loading_img" 
                                        src="https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_recommend_loading/loading.gif"
                                        alt=""
                                    />
                                </div>
                            </div>
                            :this.state.orderList.length?
                            this.state.orderList.map(item=>(
                                <OrderCard
                                    key={item.order_id}
                                    orderInfo={item}
                                    history={this.props.history}
                                    deleteOrder={_id=>this.deleteOrder(_id)}
                                />
                            ))
                            :<div className="houselist_empty_wrapper">
                                <div className="houselist_empty_icon_wrapper"><i className="iconfont icon-emizhifeiji houselist_empty_icon"/></div>
                                <div className="houselist_empty_words">暂时没有订单，下拉刷新试试~</div>
                            </div>
                        }
                    </PullToRefresh>
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