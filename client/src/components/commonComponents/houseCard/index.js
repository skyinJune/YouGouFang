import React, {Component} from 'react'
import './index.css'
import {List} from 'antd-mobile'
import {getTimeStr} from '../../../utils'

/**
 *  房源卡片
 *
 * @class HouseCard
 * @extends {Component}
 */
class HouseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let houseInfo = this.props.houseInfo;
        let avergePrice = Math.floor(houseInfo.price/houseInfo.houseArea*10000);
        return(
            <div className="house_card_wrapper">
                <List.Item className="house_card_main" 
                    onClick={()=>this.props.history.push('/housePage?_id=' + houseInfo._id)}
                    arrow="horizontal"
                >
                    {/* 主图 */}
                    <div className="house_card_mainImg_wrapper">
                        <img className="house_card_mainImg" src={houseInfo.imageURLs[0]} alt=""/>
                    </div>

                    {/* 房源部分信息 */}
                    <div className="house_card_info_wrapper">
                        {/* 标题 */}
                        <div className="house_card_info_title">{houseInfo.title}</div>

                        {/* 房型和面积 */}
                        <div className="house_card_info_layoutArea">
                            {houseInfo.houseLayout.map(item=>(item))}/
                            {houseInfo.houseArea}m<sup className="house_card_info_layoutArea_sup">2</sup>
                        </div>

                        {/* 价格 */}
                        <div className="house_card_info_price_wrapper">
                            <div className="house_card_info_price">
                                <i className="iconfont icon-RMB"/>
                                {houseInfo.price}
                                {houseInfo.saleType === "sale"? '万元':(houseInfo.rentType === 'shortRent'? '/日':'/月')}
                            </div>

                            {/* 这里如果是售房,还要显示每平米的单价 */}
                            {houseInfo.saleType === "sale"? 
                                <div className="house_card_info_price_avergePrice">
                                    {avergePrice}
                                    元/m<sup className="house_card_info_layoutArea_sup">2</sup>
                                </div>
                                :null}
                        </div>
                    </div>
                </List.Item>
                <List.Item>
                    <div className="house_card_footer_wrapper">
                        <div className="house_card_footer_publishTime">
                            {getTimeStr(houseInfo.publishTime)}发布
                        </div>
                        <div className="house_card_footer_right">
                            <span style={{marginRight: '.1rem'}}>浏览{houseInfo.browsedCount}</span>
                            <span style={{marginRight: '.1rem'}}>收藏{houseInfo.collectedCount}</span>
                        </div>
                    </div>
                </List.Item>
            </div>
        )
    }
}

export default HouseCard;
