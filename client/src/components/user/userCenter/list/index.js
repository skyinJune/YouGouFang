import React, {Component} from 'react'
import './index.css'
import {List} from 'antd-mobile'

const Item = List.Item;

class InfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedList: -1
        }
        this.toggleItem = this.toggleItem.bind(this);
    }

    toggleItem(itemValue) {
        if(itemValue === this.state.clickedList) {
            this.setState({clickedList: -1});
        }
        else {
            this.setState({clickedList: itemValue});
        }
    }

    render() {
        const ItemInfo = [
            { value: 0, label: '我收藏的', key: 'followList', thumb: 'iconfont icon-shoucang'},
            { value: 1, label: '我发布的', key: 'houseList', thumb: 'iconfont icon-icon'},
            { value: 2, label: '我的订单', key: 'orderList', thumb: 'iconfont icon-order_icon'},
            ];
        const UserSettingInfo = [
            { value: 3, label: '安全中心', key: 'userSafety', thumb: 'iconfont icon-anquan'},
            { value: 4, label: '设置', key: 'userSetting', thumb: 'iconfont icon-shezhi'},
        ]
        return (
            <div className="list_wrapper">
                <List>
                    {
                        ItemInfo.map((item)=>
                            <Item
                                className="list_item" 
                                arrow={this.state.clickedList === item.value ? 'down' : 'horizontal'}
                                thumb={<i className={item.thumb}></i>}
                                onClick={()=> this.toggleItem(item.value)}
                                key={item.value}
                            >
                                {item.label}
                            </Item>
                        )
                    }
                </List>
                <List>
                    {
                        UserSettingInfo.map((item)=>
                            <Item
                                className="list_item" 
                                arrow={this.state.clickedList === item.value ? 'down' : 'horizontal'}
                                thumb={<i className={item.thumb}></i>}
                                onClick={()=> this.toggleItem(item.value)}
                                key={item.value}
                            >
                                {item.label}
                            </Item>
                        )
                    }   
                </List>
            </div>
        )
    }
}

export default InfoList;