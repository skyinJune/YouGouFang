import React, {Component} from 'react'
import './index.css'
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
        
        console.log(value,' ', city);
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
                decorationDegree: '',
                city: city
            };
        }
        const data = JSON.stringify(fetchCondition);

        console.log(data);
        // fetch('/publishhouse', {
        //     method:'POST',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body:data
        //   }).then(response => response.json())
        //   .then(data => {
        //     Toast.hide();
        //     console.log('发布成功！',data);
        //     this.props.history.push('/publishPage/publishSuccess');
        //   });
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