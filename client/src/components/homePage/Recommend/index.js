import React, {Component} from 'react'
import './index.css'
import HouseCard from '../../commonComponents/houseCard'
import { List } from 'antd-mobile'
import {connect} from 'react-redux'
import 'whatwg-fetch'
import BMap from 'BMap'

const tabs = [
    {name: '二手房', value: 3},
    {name: '新房', value: 2},
    {name: '租房', value: 1},
]

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 1,
            isLoading: true,
            houseList: []
        }
        this.onTabChange = this.onTabChange.bind(this);
        this.fetchHouseList = this.fetchHouseList.bind(this);
        this.getCurrentCity = this.getCurrentCity.bind(this);
    }

    componentDidMount() {
        if(!this.props.citySelected.state) {
            this.getCurrentCity();
        }
        else {
            this.fetchHouseList(this.state.selectedTab, this.props.citySelected.state);
        }
    }

    fetchHouseList(value, city) {
        this.setState({isLoading: true});
        let fetchCondition = {};
        if(value === 1) {
            fetchCondition = {
                saleType: 'rent',
                city: city
            };
        }
        if(value === 2) {
            fetchCondition = {
                decorationDegree: '毛坯',
                city: city
            };
        }
        if(value === 3) {
            fetchCondition = {
                decorationDegree: {$ne: '毛坯'},
                saleType: 'sale',
                city: city
            };
        }
        const data = JSON.stringify(fetchCondition);
        fetch('/searchHouse', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
          }).then(response => response.json())
          .then(data => {
            data.sort((a, b)=>(new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()));
            this.setState({houseList: data, isLoading: false});
          });
    }

    onTabChange(value) {
        this.setState({selectedTab: value});
        this.fetchHouseList(value, this.props.citySelected.state);
    }

    getCurrentCity() {
        // 获得所在城市
        let getCity = (result)=>{
            // 把后面的'市'去掉
            var cityName = result.name.substring(0,result.name.length-1);
            this.fetchHouseList(this.state.selectedTab, cityName);
        }
        var myCity = new BMap.LocalCity();
        myCity.get(getCity);
    }

    render() {
        return(
            <div className="recommend_wrapper">
                <List>
                    <List.Item className="recommend_header_wrapper">
                        <div className="recommend_header_leftTitle">为您推荐</div>
                        {
                            tabs.map(item=>(
                                <div className={
                                        "recommend_header_rightTitle " + 
                                        (this.state.selectedTab === item.value? 'recommend_header_selectedTitle'
                                        : 'recommend_header_unselectedTitle')
                                    }
                                    onClick={()=>this.onTabChange(item.value)}
                                    key={item.name}
                                >
                                    {item.name}
                                </div>
                            ))
                        }
                    </List.Item>
                </List>
                {
                        this.state.isLoading? 
                        <div className="recommend_loading_wrapper">
                            <div className="recommend_loading_img_wrapper">
                                <img className="recommend_loading_img" 
                                    src="https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_recommend_loading/loading.gif"
                                    alt=""
                                />
                            </div>
                        </div>
                        :(
                            this.state.houseList.length?
                            this.state.houseList.map(item=>(
                                <HouseCard houseInfo={item} key={item._id} history={this.props.history}/>
                            ))
                            :<div className="recommend_empty_wrapper">
                                <div className="recommend_empty_icon_wrapper"><i className="iconfont icon-emizhifeiji recommend_empty_icon"/></div>
                                <div className="recommend_empty_words">555没有找到你想要的房源哦，去看看其他房源吧~</div>
                            </div>
                        )
                }
            </div>
        )
    }
}

// 引入store中的state
const mapStateToProps = (state) => {
    return {citySelected: state.citySelect}
}

// 把action和store一起通过props绑定到这个组件上
Recommend = connect(mapStateToProps)(Recommend);

export default Recommend;