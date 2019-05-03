import React, {Component} from 'react'
import './index.css'
import HouseCard from '../commonComponents/houseCard'
import MapCard from '../commonComponents/housePage/mapCard'
import {getUrlParams} from '../../utils'
import {List, DatePicker, Button} from 'antd-mobile'
import 'whatwg-fetch'

class BookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            house_id: getUrlParams().house_id,
            buyerAccount: getUrlParams().buyerAccount,
            houseInfo: {},
            showMap: false,
            date: new Date(Date.now())
        }
        this.fetchHouseInfo = this.fetchHouseInfo.bind(this);
        this.submitOrderInfo = this.submitOrderInfo.bind(this);
    }

    componentDidMount() {
        this.fetchHouseInfo()
    }
    
    /**
     *  拉取房源信息
     *
     * @memberof HousePage
     */
    fetchHouseInfo() {
        let search = {
            _id: this.state.house_id,
        };

        let data = JSON.stringify(search);

        fetch('/getHouseInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
          }).then(response => response.json())
          .then(data => {
            this.setState({houseInfo: data});
          });
    }

    submitOrderInfo() {
        let orderInfo = {
            house_id: this.state.house_id,
            buyerAccount: this.state.buyerAccount,
            bookingDate: this.state.date,
            createdTime: new Date(Date.now()),
        }

        let data = JSON.stringify(orderInfo);

        fetch('/bookingHouse', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
          }).then(response => response.json())
          .then(()=>{
              this.props.history.push('/successPage?type=booking')
          });
    }

    render() {
        return (
            <div>
                <div className="bookingPage_header_wrapper">
                    {/* 点击返回 */}
                    <div className="bookingPage_header_icon_wrapper"
                        onClick={()=>this.props.history.goBack()}
                    >
                        <i className="iconfont icon-zuo bookingPage_header_icon"/>
                    </div>
                    <div className="bookingPage_header_title">确认预约</div>
                </div>

                {
                    Object.keys(this.state.houseInfo).length?<div>
                    <List className="bookingPage_content_wrapper">
                        <List.Item onClick={()=>this.setState({showMap: !this.state.showMap})} arrow={this.state.showMap?'up':'down'}>
                            <div className="bookingPage_position_wrapper">
                                <div className="bookingPage_title">
                                    房源位置
                                </div>
                                <div className="bookingPage_position_title">
                                    <i className="iconfont icon-dingwei bookingPage_position_icon"/>
                                    {this.state.houseInfo.position.title}
                                </div>
                                <div className="bookingPage_position_address">
                                    {this.state.houseInfo.position.address}
                                </div>
                            </div>
                        </List.Item>
                    </List>
                    
                    <div className="bookingPage_map_wrapper" style={{'display': this.state.showMap?'block':'none'}}>
                        <MapCard position={this.state.houseInfo.position}/>
                    </div>

                    
                    <div className="bookingPage_houseCard_wrapper">
                        <div className="bookingPage_title">
                            房源信息
                        </div>
                        <HouseCard houseInfo={this.state.houseInfo}/>
                    </div>

                    <div className="bookingPage_datePicker_Wrapper">
                        <DatePicker
                            title="选择看房时间"
                            value={this.state.date}
                            minDate={this.state.date}
                            onChange={date => this.setState({ date })}
                            >
                            <List.Item arrow="horizontal">选择看房日期和时间</List.Item>
                        </DatePicker>
                    </div>

                    <Button type="primary" onClick={()=>this.submitOrderInfo()} className="bookingPage_button">提交预约</Button>
                    </div>
                    :null
                }
            </div>
        )
    }
}

export default BookingPage