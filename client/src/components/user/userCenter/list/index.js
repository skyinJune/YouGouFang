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
            { value: 0, label: '我收藏的', key: 'followList' },
            { value: 1, label: '我发布的', key: 'houseList' },
            { value: 2, label: '我的订单', key: 'orderList' },
            ];
        return (
            <div className="list_wrapper">
                <List>
                    {
                        ItemInfo.map((item)=>
                            <Item 
                                arrow={this.state.clickedList === item.value ? 'down' : 'horizontal'}
                                thumb="http://yougoufang.oss-cn-hongkong.aliyuncs.com/YouGouFangDefultAvator.png"
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