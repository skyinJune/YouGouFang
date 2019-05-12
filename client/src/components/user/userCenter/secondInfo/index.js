import React, {Component} from 'react'
import './index.css'

/**
 *  用户第二信息组件
 *
 * @class SecondInfo
 * @extends {Component}
 */
class SecondInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // 第二信息
        const ItemsInfo = [
            { value: 0, label: '星级', key: 'starLevel'},
            { value: 1, label: '关注数', key: 'followList'},
            { value: 2, label: '粉丝数', key: 'fansList'}
        ];
        const userInfo = this.props.userInfo;
        return (
            <div className="second_info_wrapper">
                {
                    Object.keys(userInfo).length?
                    ItemsInfo.map((item)=>
                        <div className="second_info_midThree" key={item.key}>
                            <div className="second_info_itemNumber">
                                {
                                    (typeof userInfo[item.key]) === 'number' ? 
                                    (userInfo[item.key]? userInfo[item.key]: '-')
                                    :userInfo[item.key].length
                                }
                            </div>
                            <div className="second_info_label">
                                {item.label}
                            </div>
                        </div>
                    )
                    :null
                }
            </div>
        )
    }
}

export default SecondInfo;