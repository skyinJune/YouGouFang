import React, {Component} from 'react'
import './index.css'
import {List, WhiteSpace} from 'antd-mobile'

/**
 *  我发布的组件
 *
 * @class HouseList
 * @extends {Component}
 */
class HouseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <div className="houselist_header_wrapper">
                    {/* 点击返回 */}
                    <div className="houselist_header_icon_wrapper"
                        onClick={()=>this.props.history.goBack()}
                    >
                        <i className="iconfont icon-zuo houselist_header_icon"/>
                    </div>
                    <div className="houselist_header_unshelf"
                        onClick={()=>console.log('下架房源')}
                    >
                        下架房源
                        <i className="iconfont icon-xiajia"/>
                    </div>
                    <div className="houselist_header_title">我发布的</div>
                </div>
                <div className="houselist_list_wrapper">
                    <div><List>
                        <List.Item>
                            <div className="houselist_item_content">
                            </div>
                            <div className="houselist_item_footer">

                            </div>
                        </List.Item>
                    </List>
                    <WhiteSpace/></div>
                </div>
            </div>
        )
    }
}

export default HouseList;