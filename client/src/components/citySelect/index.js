import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Icon} from 'antd-mobile'
import { SearchBar, WhiteSpace, WingBlank, Flex, List, Toast } from 'antd-mobile'
import './index.css'
import {throttle} from '../../utils'
import BMap from 'BMap'
import {connect } from 'react-redux'
import {citySelect} from '../../actions'


const cityList = require('../../static/cityList.json').data;
const CityListForSearch = [];
Object.keys(cityList.cities).forEach((item)=>{CityListForSearch.push(...cityList.cities[item])});

class CitySelect extends Component {
    constructor(props) {
        super(props);
        this.state= {
            searchWord: '',
            searchResult: [],
            navOffsetX: 0,
            currentLetter: '',
            isMoving: false,
            currentCity: ''
        }
        this.getCurrentCity = this.getCurrentCity.bind(this);
        this.onSearchWordChange = this.onSearchWordChange.bind(this);
        this.searchCity = this.searchCity.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.getCurrentLetter = this.getCurrentLetter.bind(this);
        this.scrollToCities = this.scrollToCities.bind(this);
        this.onCitySelected = this.onCitySelected.bind(this);
    }

    componentDidMount() {
        this.getCurrentCity();
    }

    getCurrentCity() {
        let getCity = (result)=>{
            var cityName = result.name;
            this.setState({currentCity: cityName});
            Toast.info('已定位到' + cityName, 1);
        }
        var myCity = new BMap.LocalCity();
        myCity.get(getCity);
    }

    onCitySelected(city) {
        this.props.citySelect(city);
        this.props.history.goBack();
    }

    onSearchWordChange(val) {
        this.setState({searchWord: val});
        if(val) {
            this.searchCity(val);
        }
    }

    searchCity(value) {
        let tempResult = [];
        CityListForSearch.forEach((item)=>{
            if((item.name.indexOf(value)>=0) || (item.spell.indexOf(value)>=0)) {
                tempResult.push(item);
            }
        });
        this.setState({searchResult: tempResult});
    }

    onTouchStart(e) {
        if (e.target.tagName !== 'LI') {
            return;
        }
        const navOffsetX = e.changedTouches[0].clientX;
        const y = e.changedTouches[0].clientY;
        this.setState({navOffsetX}, ()=>{
            this.getCurrentLetter(y);
            this.setState({isMoving: true});
            window.addEventListener('touchmove', throttle(this.onTouchMove, 300), { passive: false });
            window.addEventListener('touchend', this.onTouchEnd);
        })
    }

    onTouchMove = e => {
        if ( e.cancelable ) {
            e.preventDefault();
        }
        this.getCurrentLetter(e.changedTouches[0].clientY);
    }

    onTouchEnd = () => {
        setTimeout(() => {
            this.setState({isMoving: false});
            window.removeEventListener('touchmove', this.onTouchMove);
            window.removeEventListener('touchend', this.onTouchEnd);
        }, 500);
    }

    getCurrentLetter(y) {
        const {navOffsetX} = this.state;
        const currentItem = document.elementFromPoint(navOffsetX, y);
        if(currentItem && currentItem.classList.contains('cityselect_lable_item') && currentItem.textContent) {
            const currentLetter = currentItem.textContent;
            this.setState({currentLetter});
            this.scrollToCities(currentLetter);
        }
    }

    scrollToCities(letter) {
        ReactDOM.findDOMNode(this.refs[letter]).scrollIntoView();
    }

    render() {
        return (
            <div className="cityselect_wrapper">
                <div className="cityselect_header">
                    <Icon className="cityselect_header_leftIcon" type="left" size="lg" onClick={()=>this.props.history.goBack()}/>
                    <WingBlank>
                    <SearchBar
                        placeholder="输入城市名称"
                        onChange={(val)=>this.onSearchWordChange(val)}
                    />
                    </WingBlank>
                </div>
                {
                    this.state.searchWord ?
                    <List className="search_result">
                        {
                            this.state.searchResult.length !== 0?
                            this.state.searchResult.map((item)=>(
                                <List.Item key={item.id}
                                    onClick={()=>this.onCitySelected(item.name)}
                                >
                                    {item.name}
                                </List.Item>
                            ))
                            :<div className="noresult_wrapper">
                                <WhiteSpace size="lg"/>
                                <div className="noresult_icon_wrapper">
                                    <i className="iconfont icon-wukong noresult_icon"/>
                                </div>
                                <div className="noresult_word">没有找到你输入的城市</div>
                                <WhiteSpace size="lg"/>
                            </div>
                        }
                    </List>
                    :<div><div className="cityselect_currentCity_wrapper">
                        <WhiteSpace size="lg"/>
                        <WingBlank>
                            <div className="cityselect_currentCity_title">定位/最近访问</div>
                            <WhiteSpace/>
                            <Flex
                                direction="row"
                                wrap="wrap"
                            >
                                <div className="cityselect_CurrentCityCard"
                                    onClick={()=>this.onCitySelected(this.state.currentCity.substring(0,this.state.currentCity.length-1))}
                                >
                                    <i className="iconfont icon-dingwei"/>
                                    {this.state.currentCity.substring(0,this.state.currentCity.length-1)}
                                </div>
                                <i className="iconfont icon-shuaxin cityselect_CurrentCity_refresh"
                                    onClick={()=>this.getCurrentCity()}
                                />
                                
                            </Flex>
                        </WingBlank>
                        <WhiteSpace size="lg"/>
                    </div>
                    <WhiteSpace size="lg"/>
                    <div className="cityselect_hotcity">
                    <WhiteSpace size="lg"/>
                        <WingBlank>
                            <div className="cityselect_currentCity_title">热门城市</div>
                            <WhiteSpace/>
                            <Flex
                                direction="row"
                                wrap="wrap"
                            >
                                {
                                    cityList.hotCities.map((item)=>(
                                        <div key={item.id} 
                                            className="cityselect_cityCard"
                                            onClick={()=>this.onCitySelected(item.name)}
                                        >
                                            {item.name}
                                        </div>
                                    ))
                                }
                            </Flex>
                        </WingBlank>
                        <WhiteSpace size="lg"/>
                    </div>
                    <div className="cityselect_cityList_wrapper">
                        {
                            Object.keys(cityList.cities).map((item)=>(
                                <List key={item}>
                                    <List.Item className="cityselect_cityList_header"
                                        ref={item}
                                    >
                                        {item}
                                    </List.Item>
                                    {
                                        cityList.cities[item].map((item)=>(
                                            <List.Item key={item.id}
                                                onClick={()=>this.onCitySelected(item.name)}
                                            >
                                                {item.name}
                                            </List.Item>
                                        ))
                                    }
                                </List>
                            ))
                        }
                    </div>
                    <div className="cityselect_lable">
                        <ul className="cityselect_lable_wrapper" onTouchStart={ this.onTouchStart }>
                            {
                                Object.keys(cityList.cities).map(item=>(
                                    <li className="cityselect_lable_item" key={item}>
                                        {item}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        this.state.isMoving?
                        <div className="cityselect_indicator">
                            {this.state.currentLetter}
                        </div>
                        :null
                    }
                    </div>
                }            
            </div>
        )
    }
}

// 引入store中的state
const mapStateToProps = (state) => {
    return {citySelected: state.citySelect}
}

// 引入需要的action
const actionCreater = {citySelect};

// 把action和store一起通过props绑定到这个组件上
CitySelect = connect(mapStateToProps,actionCreater)(CitySelect);

export default CitySelect;