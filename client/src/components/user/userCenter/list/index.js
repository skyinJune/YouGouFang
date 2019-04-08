import React, {Component} from 'react'
import './index.css'
import {List} from 'antd-mobile'
import { Link} from 'react-router-dom';
const Item = List.Item;

class InfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const ItemInfo = [
            { value: 0, label: '我收藏的', key: 'collectionList', thumb: 'iconfont icon-shoucang'},
            { value: 1, label: '我发布的', key: 'houseList', thumb: 'iconfont icon-icon'},
            { value: 2, label: '我的订单', key: 'orderList', thumb: 'iconfont icon-order_icon'},
            { value: 3, label: '安全中心', key: 'userSafety', thumb: 'iconfont icon-anquan'},
            { value: 4, label: '设置', key: 'userSetting', thumb: 'iconfont icon-shezhi'}
            ];

        return (
            <div className="list_wrapper">
                <List>
                    {
                        ItemInfo.map((item)=>
                            <Link to={'/usercenter/' + item.key}
                                  key={item.value}
                            >
                                <Item
                                    className="list_item" 
                                    arrow='horizontal'
                                    thumb={<i className={item.thumb}></i>}
                                >
                                    {item.label}
                                </Item>
                            </Link>
                        )
                    }
                </List>
            </div>
        )
    }
}

export default InfoList;