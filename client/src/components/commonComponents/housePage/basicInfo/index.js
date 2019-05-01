import React, {Component} from 'react'
import './index.css'
import {List} from 'antd-mobile'

class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.getCheckInTimeString = this.getCheckInTimeString.bind(this);
    }

    getCheckInTimeString() {
        let now = new Date(Date.now()).getTime();
        let checkInTimeDate = new Date(this.props.houseInfo.checkInTime);
        let checkInTime = checkInTimeDate.getTime();
        let returnString = '';
        if(now - checkInTime >= 0) {
            returnString = '随时入住';
        }
        else {
            returnString = checkInTimeDate.toLocaleDateString();
        }

        return returnString
    }

    render() { 
        return (
            <div>
                {
                    Object.keys(this.props.houseInfo).length?
                    <List>
                        <List.Item>
                            <div className="housePage_basicInfo_title">
                                {this.props.houseInfo.title}
                            </div>
                            <div className="housePage_basicInfo_addressTitle">
                                {this.props.houseInfo.position.address}
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="housePage_basicInfo_midPart">
                                {/* 价格 */}
                                <div className="housePage_basicInfo_midPart_item">
                                    <div className="housePage_basicInfo_midPart_item_red">
                                        {this.props.houseInfo.price}
                                        {this.props.houseInfo.saleType === 'rent'? 
                                            (this.props.houseInfo.rentType === 'shortRent'? '元/日':'元/月'): '万'}
                                    </div>
                                    <div className="housePage_basicInfo_midPart_item_gray">
                                        {this.props.houseInfo.saleType === 'rent'? '租金': '售价'}
                                    </div>
                                </div>

                                {/* 房型 */}
                                <div className="housePage_basicInfo_midPart_item">
                                    <div className="housePage_basicInfo_midPart_item_red">
                                        {this.props.houseInfo.houseLayout.map(item=>item)}
                                    </div>
                                    <div className="housePage_basicInfo_midPart_item_gray">
                                        房型
                                    </div>
                                </div>

                                {/* 面积 */}
                                <div className="housePage_basicInfo_midPart_item">
                                    <div className="housePage_basicInfo_midPart_item_red">
                                        {this.props.houseInfo.houseArea}m<sup>2</sup>
                                    </div>
                                    <div className="housePage_basicInfo_midPart_item_gray">
                                        面积
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="housePage_basicInfo_bottomPart">
                                {/* 装修程度 */}
                                <div className="housePage_basicInfo_bottomPart_item">
                                    <div className="housePage_basicInfo_bottomPart_item_gray">
                                        装修
                                    </div>
                                    <div className="housePage_basicInfo_bottomPart_item_content">
                                        {this.props.houseInfo.decorationDegree}
                                    </div>
                                </div>
                                
                                {/* 入住时间 */}
                                <div className="housePage_basicInfo_bottomPart_item">
                                    <div className="housePage_basicInfo_bottomPart_item_gray">
                                        入住
                                    </div>
                                    <div className="housePage_basicInfo_bottomPart_item_content">
                                        {this.getCheckInTimeString()}
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

export default BasicInfo