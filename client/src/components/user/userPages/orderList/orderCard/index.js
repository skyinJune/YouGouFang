import React, {Component} from 'react'
import './index.css'
import {List, Modal, Accordion} from 'antd-mobile'
import {getTimeStr} from '../../../../../utils'

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
        this.getOrderStatus = this.getOrderStatus.bind(this);
        this.changeOrderStatus = this.changeOrderStatus.bind(this);
    }

    componentDidMount() {
        this.fetchOrderInfo(this.props.orderInfo);
    }

    componentWillReceiveProps(props) {
        this.fetchOrderInfo(props.orderInfo);
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

    getOrderStatus() {
        let returnStr = '';
        if(this.state.orderInfo.status === 'waitOwnerConfirm') {
            if(this.state.orderType === 'buyer') {
                returnStr = '等待房东确认'
            }
            else {
                returnStr = '等待您确认'
            }
        }
        if(this.state.orderInfo.status === 'ownerRefused') {
            if(this.state.orderType === 'buyer') {
                returnStr = '预约被卖家拒绝'
            }
            else {
                returnStr = '预约已拒绝'
            }
        }
        if(this.state.orderInfo.status === 'confirmOK') {
            returnStr = '确认完成,待看房'
        }
        if(this.state.orderInfo.status === 'canceledByBuyer') {
            if(this.state.orderType === 'buyer') {
                returnStr = '预约已由您取消'
            }
            else {
                returnStr = '预约已由买家取消'
            }
        }
        if(this.state.orderInfo.status === 'canceledByOwner') {
            if(this.state.orderType === 'buyer') {
                returnStr = '预约已由房东取消'
            }
            else {
                returnStr = '预约已由您取消'
            }
        }
        if(this.state.orderInfo.status === 'waitComment') {
            returnStr = '看房完成，待评价'
        }
        if(this.state.orderInfo.status === 'waitBuyerComment') {
            if(this.state.orderType === 'buyer') {
                returnStr = '看房完成，待评价'
            }
            else {
                returnStr = '待买家评价'
            }
        }
        if(this.state.orderInfo.status === 'waitOwnerComment') {
            if(this.state.orderType === 'buyer') {
                returnStr = '待卖家评价'
            }
            else {
                returnStr = '看房完成，待评价'
            }
        }
        if(this.state.orderInfo.status === 'finish') {
            returnStr = '订单完成'
        }

        return returnStr
    }

    changeOrderStatus(status) {
        const orderInfo = {
            _id: this.state.orderInfo._id,
            status: status
        };
        const data = JSON.stringify(orderInfo);
        fetch('/changeOrderInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
        }).then(()=>this.fetchOrderInfo(this.props.orderInfo))
    }

    onCancleClicked() {
        Modal.alert('取消预约','无故取消预约将影响个人星级',
            [
                { text: '返回', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确认取消', onPress: () => this.changeOrderStatus(this.state.orderType === 'buyer'? 'canceledByBuyer':'canceledByOwner'), },
            ]
        )
    }

    onRefusedClicked() {
        Modal.alert('拒绝预约','确认要拒绝此次预约嘛？',
            [
                { text: '返回', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确认', onPress: () => this.changeOrderStatus('ownerRefused'), },
            ]
        )
    }

    onConfirmClicked() {
        Modal.alert('确认接受','确认前请再次核对预约看房时间',
            [
                { text: '返回', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确认', onPress: () => this.changeOrderStatus('confirmOK'), },
            ]
        )
    }

    onFinishClicked() {
        Modal.alert('确认完成','确认已完成看房',
            [
                { text: '返回', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确认', onPress: () => this.changeOrderStatus('waitComment'), },
            ]
        )
    }

    getCommentStars(num) {
        let starList = [];
        for(let i =0; i<num; i++) {
            starList.push(<i className="iconfont icon-star orderCard_star_icon" key={i}/>)
        }
        return starList
    }

    render() {
        return (
            <div className="orderCard_wrapper">
                {
                    Object.keys(this.state.orderInfo).length&&Object.keys(this.state.houseInfo).length?
                    <List>
                        <List.Item onClick={()=>this.props.history.push('/housePage?_id=' + this.state.houseInfo._id)} arrow="horizontal">
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
                                        预约时间:{' ' + (new Date(this.state.orderInfo.bookingDate)).toLocaleDateString()}
                                        {' ' + (new Date(this.state.orderInfo.bookingDate)).getHours() + ':' +
                                            ((new Date(this.state.orderInfo.bookingDate)).getMinutes()<10?
                                            '0'+(new Date(this.state.orderInfo.bookingDate)).getMinutes()
                                            :(new Date(this.state.orderInfo.bookingDate)).getMinutes())
                                        }
                                    </div>
                                    <div className="orderCard_info_status">
                                        订单状态：{this.getOrderStatus()}
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                        {
                            this.state.orderInfo.status === 'finish'?
                            <Accordion>
                                <Accordion.Panel header="查看评价">
                                    <List>
                                        <List.Item>
                                            <div className="orderCard_comment_wrapper">
                                                <div className="orderCard_comment_title">{this.state.orderType === 'buyer'? '房东评价': '房客评价'}</div>
                                                <div className="orderCard_comment_star">
                                                    {this.getCommentStars(this.state.orderType === 'buyer'? 
                                                        this.state.orderInfo.ownerCommentStar :this.state.orderInfo.buyerCommentStar)}
                                                </div>
                                            </div>
                                            <div className="orderCard_comment_text">
                                                {this.state.orderType === 'buyer'? 
                                                    this.state.orderInfo.ownerComment :this.state.orderInfo.buyerComment}
                                            </div>
                                        </List.Item>
                                        <List.Item>
                                            <div className="orderCard_comment_wrapper">
                                                <div className="orderCard_comment_title">我的评价</div>
                                                <div className="orderCard_comment_star">
                                                    {this.getCommentStars(this.state.orderType === 'buyer'? 
                                                    this.state.orderInfo.buyerCommentStar :this.state.orderInfo.ownerCommentStar)}
                                                </div>
                                            </div>
                                            <div className="orderCard_comment_text">
                                                {this.state.orderType === 'buyer'? 
                                                this.state.orderInfo.buyerComment :this.state.orderInfo.ownerComment}
                                            </div>
                                        </List.Item>
                                    </List>
                                </Accordion.Panel>
                            </Accordion>
                            :null
                        }
                        <List.Item>
                            <div className="orderCard_bottom_wrapper">
                                <div className="orderCard_publishtime">{getTimeStr(this.state.orderInfo.createdTime)}发布</div>
                                <div className="orderCard_operate_wrapper">
                                    <div className="orderCard_operate_confirm"
                                        onClick={()=>{
                                            this.state.orderType === 'owner'? 
                                            console.log('buyerAccount', this.state.orderInfo.buyerAccount)
                                            :console.log('ownerAccount', this.state.orderInfo.ownerAccount)
                                        }}
                                    >
                                        {this.state.orderType === 'owner'? '联系房客': '联系房东'}
                                    </div>
                                    {
                                        (this.state.orderInfo.status === 'waitOwnerConfirm'&& this.state.orderType === 'buyer')
                                        || this.state.orderInfo.status === 'confirmOK'?
                                        <div className="orderCard_operate_cancel" 
                                            onClick={()=>this.onCancleClicked()}>
                                            取消预约
                                        </div>
                                        :null
                                    }
                        
                                    {
                                        this.state.orderInfo.status === 'waitOwnerConfirm'
                                        && this.state.orderType === 'owner'?
                                        <div className="orderCard_operate_confirm"
                                            onClick={()=>this.onConfirmClicked()}
                                        >确认接受</div>
                                        :null
                                    }

                                    {
                                        this.state.orderInfo.status === 'waitOwnerConfirm'
                                        && this.state.orderType === 'owner'?
                                        <div className="orderCard_operate_cancel"
                                            onClick={()=>this.onRefusedClicked()}
                                        >拒绝</div>
                                        :null
                                    }
                                    
                                    {
                                        (this.state.orderInfo.status === 'waitComment'
                                        || (this.state.orderInfo.status === 'waitBuyerComment'
                                            && this.state.orderType === 'buyer')
                                        || (this.state.orderInfo.status === 'waitOwnerComment'
                                            && this.state.orderType === 'owner'))?
                                        <div className="orderCard_operate_confirm"
                                            onClick={()=>this.props.history.push('/commentPage?order_id=' + this.state.orderInfo._id + '&type=' + this.state.orderType)}
                                        >去评价</div>
                                        :null
                                    }
                                    {
                                        this.state.orderInfo.status === 'confirmOK'
                                        && this.state.orderType === 'owner'?
                                        <div className="orderCard_operate_confirm"
                                            onClick={()=>this.onFinishClicked()}
                                        >完成看房</div>
                                        :null
                                    }
                                    {
                                        this.state.orderInfo.status === 'finish'|| this.state.orderInfo.status === 'canceledByBuyer'
                                        || this.state.orderInfo.status === 'canceledByOwner'
                                        || this.state.orderInfo.status === 'ownerRefused'?
                                        <div className="orderCard_operate_delete"
                                            onClick={()=>this.props.deleteOrder(this.state.orderInfo._id)}
                                        >删除订单</div>
                                        :null
                                    }
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