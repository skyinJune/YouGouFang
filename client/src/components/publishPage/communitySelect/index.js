import React, {Component} from 'react'
import {List, WingBlank, WhiteSpace, SearchBar} from 'antd-mobile'
import './index.css'
import BMap from 'BMap'
import {connect } from 'react-redux'
import {communitySelect, citySelect} from '../../../actions'

/**
 *  小区选择组件
 *
 * @class CommunitySelect
 * @extends {Component}
 */
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
        // 定位到当前城市
        this.getCurrentCity();
        if(!this.props.citySelected.state) {
            this.initLocalSearch();
        }
    }

    /**
     *  获取当前城市的函数
     *
     * @memberof CommunitySelect
     */
    getCurrentCity() {
        // 获得所在城市
        let getCity = (result)=>{
            // 把后面的'市'去掉
            var cityName = result.name.substring(0,result.name.length-1);
            this.setState({currentCity: cityName});
        }
        var myCity = new BMap.LocalCity();
        myCity.get(getCity);
    }

    /**
     *  定位后初始化搜索(以定位结果的周围1000米搜索附近的小区)
     *
     * @param {*} val 当搜索框的值
     * @memberof CommunitySelect
     */
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

            // 设置每次搜索的结果返回的上限为100
            local.setPageCapacity(100);

            // 当搜索框的值变化后(不为空),全城搜索
            if(val) {
                local.search(val);
            }
            else {
                local.searchNearby('小区', '公寓', point, 1000);
            }
        }

    }

    /**
     *  选择城市后，全城搜索输入的关键词
     *
     * @param {*} val
     * @memberof CommunitySelect
     */
    searchInSelectedCity(val) {
        var _this = this;
        var options = {
            onSearchComplete: (results)=>_this.onLocalSearch(results)
        };
        var local = new BMap.LocalSearch(this.props.citySelected.state, options);
        local.search(val);
    }

    /**
     *  处理搜索结果
     *
     * @param {*} results 百度地图api返回的搜索结果
     * @memberof CommunitySelect
     */
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

    /**
     *  当小区(搜索结果)被选中时的处理函数
     *
     * @param {*} item 被选中的item的信息
     * @memberof CommunitySelect
     */
    onCommunitySelected(item) {
        // 使用redux的communitySelect action来处理
        this.props.communitySelect(item);

        // 判断是是否选择过城市
        if(!this.props.citySelected) {
            // 如果没选过就将定位的城市设置为选择的城市
            this.props.citySelect(this.state.currentCity);
        }

        // 返回
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