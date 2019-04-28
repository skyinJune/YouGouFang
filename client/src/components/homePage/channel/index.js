import React, {Component} from 'react'
import './index.css'

const channel_item_info = [
    {
        name: '租房',
        iconUrl: 'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_channel_img/rent.png'
    },
    {
        name: '卖房',
        iconUrl: 'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_channel_img/sale.png'
    },
    {
        name: '新房',
        iconUrl: 'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_channel_img/new.png'
    },
    {
        name: '中介',
        iconUrl: 'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_channel_img/agent.png'
    },
]

class Channel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="channel_wrapper">
                {
                    channel_item_info.map(item=>(
                        <div className="channel_item"
                            key={item.name}
                            onClick={()=>console.log(item.name)}
                        >
                            <div>
                                <img src={item.iconUrl} className="channel_item_img" alt=""/>
                            </div>
                            <div className="channel_item_name">{item.name}</div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Channel;