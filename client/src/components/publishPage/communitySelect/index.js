import React, {Component} from 'react'
import {List, WingBlank, WhiteSpace, SearchBar} from 'antd-mobile'
import './index.css'
import BMap from 'BMap';

class CommunitySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCity : ''
        }
    }
    
    componentDidMount() {
        // 创建地图实例
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,12);

        // 获得所在城市
        let getCity = (result)=>{
            var cityName = result.name;
            this.setState({currentCity: cityName});
        }
        var myCity = new BMap.LocalCity();
        myCity.get(getCity);

        // 获得当前精确地理位置
        var geolocation = new BMap.Geolocation();
        let getPosition = ()=> geolocation.getCurrentPosition((r)=>{
            console.log('您的位置：'+r.point.lng+','+r.point.lat);
        });
        getPosition();
    }

    render() {
        return (
            <div className="communitySelect_wrapper">
                <div className="communitySelect_header_wrapper">
                    <WhiteSpace/>
                    <WingBlank>
                        <div className="communitySelect_header_main">
                            <div className="communitySelect_header_city" onClick={()=>console.log('city select clicked')}>
                                {this.state.currentCity}
                                <i className="iconfont icon-tubiaozhizuo- communitySelect_header_city_icon"/>
                            </div>
                            <SearchBar placeholder="请输入小区名称" 
                            onCancel={()=>this.props.history.goBack()}
                            showCancelButton={true}
                            />
                        </div>
                    </WingBlank>
                </div>
                <List>
                    <div id="allmap"></div>
                    <List.Item>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default CommunitySelect;