import React, {Component} from 'react'
import {List, WingBlank, WhiteSpace, SearchBar} from 'antd-mobile'
import './index.css'
import BMap from 'BMap';

class CommunitySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCity: '',
            searchResult: []
        }
        this.onLocalSearch = this.onLocalSearch.bind(this);
    }
    
    componentDidMount() {
        var _this = this;
        // 创建地图实例
        var map = new BMap.Map("allmap");

        // 获得所在城市
        let getCity = (result)=>{
            var cityName = result.name;
            this.setState({currentCity: cityName});
        }
        var myCity = new BMap.LocalCity();
        myCity.get(getCity);

        // 获得当前精确地理位置
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((r)=>{
            var point = new BMap.Point(r.point.lng, r.point.lat);
            map.centerAndZoom(point,12);
        });

        var options = {
            onSearchComplete: (results)=>_this.onLocalSearch(results)
        };
        var local = new BMap.LocalSearch(map, options);
        local.search("公园");
    }

    onLocalSearch(results) {
        var s = [];
        for (var i = 0; i < results.getCurrentNumPois(); i ++){
            // s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
            s.push({title: results.getPoi(i).title, address: results.getPoi(i).address})
        }
        this.setState({searchResult: s});
    }

    render() {
        console.log(this.state)
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