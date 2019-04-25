import React, {Component} from 'react'
import {List, WingBlank, WhiteSpace, SearchBar} from 'antd-mobile'
import './index.css'
import BMap from 'BMap'
import {connect } from 'react-redux'
import {communitySelect, citySelect} from '../../../actions'

class CommunitySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCity: '',
            searchResult: [],
            isLocalCity: true
        }
        this.onLocalSearch = this.onLocalSearch.bind(this);
        this.getCurrentCity = this.getCurrentCity.bind(this);
        this.initLocalSearch = this.initLocalSearch.bind(this);
        this.searchInSelectedCity = this.searchInSelectedCity.bind(this);
        this.onCommunitySelected = this.onCommunitySelected.bind(this);
    }
    
    componentDidMount() {
        this.getCurrentCity();
        if(!this.props.citySelected.state) {
            this.initLocalSearch();
        }
    }

    getCurrentCity() {
        // 获得所在城市
        let getCity = (result)=>{
            var cityName = result.name.substring(0,result.name.length-1);
            this.setState({currentCity: cityName});
        }
        var myCity = new BMap.LocalCity();
        myCity.get(getCity);
    }

    initLocalSearch(val) {
        var _this = this;

        // 目前没法做到获得精确地理位置，h5调用位置接口会超时，只能用ip定位了
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((r)=>toSearch(r));

        let toSearch = (r)=> {
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(r.point.lng, r.point.lat);
            map.centerAndZoom(point,12);

            var options = {
                onSearchComplete: (results)=>_this.onLocalSearch(results)
            };
            var local = new BMap.LocalSearch(map, options);
            local.setPageCapacity(100);
            if(val) {
                local.search(val);
            }
            else {
                local.searchNearby('小区', '公寓', point, 1000);
            }
        }

    }

    searchInSelectedCity(val) {
        var _this = this;
        var options = {
            onSearchComplete: (results)=>_this.onLocalSearch(results)
        };
        var local = new BMap.LocalSearch(this.props.citySelected.state, options);
        local.search(val);
    }

    onLocalSearch(results) {
        var s = [];
        for (var i = 0; i < results.getCurrentNumPois(); i ++){
            s.push(
                {
                    title: results.getPoi(i).title, 
                    address: results.getPoi(i).address,
                    point: results.getPoi(i).point
                })
        }
        this.setState({searchResult: s});
    }

    onCommunitySelected(item) {
        this.props.communitySelect(item);
        if(!this.props.citySelected) {
            this.props.citySelect(this.state.currentCity);
        }
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="communitySelect_wrapper">
                <div className="communitySelect_header_wrapper">
                    <WhiteSpace/>
                    <WingBlank>
                        <div className="communitySelect_header_main">
                            <div className="communitySelect_header_city" onClick={()=>this.props.history.push('/citySelect')}>
                                {this.props.citySelected.state||this.state.currentCity}
                                <i className="iconfont icon-tubiaozhizuo- communitySelect_header_city_icon"/>
                            </div>
                            <SearchBar placeholder="请输入小区名称" 
                            onCancel={()=>this.props.history.goBack()}
                            onChange={(val)=>{
                                if(this.props.citySelected.state) {
                                    this.searchInSelectedCity(val)
                                }
                                else {
                                    this.initLocalSearch(val)
                                }
                            }}
                            showCancelButton={true}
                            />
                        </div>
                    </WingBlank>
                </div>
                <div className="communitySelect_result_wrapper">
                    <List>
                        <div id="allmap"></div>
                        {
                            this.state.searchResult.map((item,index)=> (
                                <List.Item
                                    key={item.address+index}
                                    onClick={()=>this.onCommunitySelected(item)}
                                >
                                    {item.title}
                                    <List.Item.Brief>{item.address}</List.Item.Brief>
                                </List.Item>
                            ))
                        }
                    </List>
                </div>
            </div>
        )
    }
}

// 引入store中的state
const mapStateToProps = (state) => {
    return {citySelected: state.citySelect}
}

// 引入需要的action
const actionCreater = {communitySelect, citySelect};

// 把action和store一起通过props绑定到这个组件上
CommunitySelect = connect(mapStateToProps,actionCreater)(CommunitySelect);

export default CommunitySelect;