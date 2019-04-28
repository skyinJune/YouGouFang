import React, {Component} from 'react'
import './index.css'
import {connect} from 'react-redux'
import {citySelect} from '../../../actions'
import BMap from 'BMap'

/**
 *  首页Header组件
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.getCurrentCity = this.getCurrentCity.bind(this);
    }

    componentDidMount() {
        if(!this.props.citySelected.state) {
            this.getCurrentCity();
        }
    }

    getCurrentCity() {
        // 获得所在城市
        let getCity = (result)=>{
            // 把后面的'市'去掉
            var cityName = result.name.substring(0,result.name.length-1);
            this.props.citySelect(cityName);
        }
        var myCity = new BMap.LocalCity();
        myCity.get(getCity);
    }

    render() {
        return (
            <div className="home_header_wrapper">
                <div className="home_header_logo_wrapper">
                    <img className="home_header_logo" src="https://yougoufang.oss-cn-hongkong.aliyuncs.com/home_logo.png" alt=""/>
                </div>
                <div className="home_header_search_wrapper"
                    onClick={()=>console.log('on search click')}
                >
                    <i className="iconfont icon-sousuo home_header_search_icon"/>找找你想住的房
                </div>
                <div className="home_header_city_wrapper"
                    onClick={()=>this.props.history.push('/citySelect')}
                >
                    {this.props.citySelected.state}<i className="iconfont icon-xia home_header_city_icon"/>
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
const actionCreater = {citySelect};

// 把action和store一起通过props绑定到这个组件上
Header = connect(mapStateToProps, actionCreater)(Header);

export default Header;