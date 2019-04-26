import React, {Component} from 'react'
import './index.css'
import {List, WhiteSpace, Toast} from 'antd-mobile'
import { connect } from 'react-redux'
import 'whatwg-fetch'

/**
 *  我发布的
 *
 * @class HouseList
 * @extends {Component}
 */
class HouseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houseList: []
        };
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.fetchHouseList = this.fetchHouseList.bind(this);
    }

    componentDidMount() {
        if(this.props.logInfo.isLogin) {
            this.fetchUserInfo();
        }
        else {
            this.props.history.push('/login');
        }
    }

    /**
     *  发送请求的函数
     *
     * @memberof UserCenterIndex
     */
    fetchUserInfo() {

        // 发送请求时的加载态
        Toast.loading('加载房源列表数据...');

        const userInfo = {
            account: this.props.logInfo.user
        };

        // 转换为Json字符串
        const data = JSON.stringify(userInfo);

        fetch('/getUserInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
        }).then(response => response.json())
        .then(data=>{
            let houseList = data.houseList;
            this.fetchHouseList(houseList);
        })
    }

    fetchHouseList(houseList) {
        houseList.forEach(item=>{
            const houseInfo = {
                _id: item
            };
            const data = JSON.stringify(houseInfo);
            fetch('/getHouseInfo', {
                method:'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body:data
            }).then(response => response.json())
            .then(data=>{
                let tempList = this.state.houseList;
                tempList.push(data);
                this.setState({houseList: tempList},()=>{
                    if(this.state.houseList.length === houseList.length) {
                        Toast.hide();
                    }
                });
            })
        })
    }

    render() {
        return (
            <div>
                <div className="houselist_header_wrapper">
                    {/* 点击返回 */}
                    <div className="houselist_header_icon_wrapper"
                        onClick={()=>this.props.history.goBack()}
                    >
                        <i className="iconfont icon-zuo houselist_header_icon"/>
                    </div>
                    <div className="houselist_header_unshelf"
                        onClick={()=>console.log('下架房源')}
                    >
                        下架房源
                        <i className="iconfont icon-xiajia"/>
                    </div>
                    <div className="houselist_header_title">我发布的</div>
                </div>
                <div className="houselist_list_wrapper">
                    {
                        this.state.houseList.map(item=>(
                            <div key={item._id}>
                            <List>
                                <List.Item>
                                    <div className="houselist_item_content">
                                        <div className="houselist_item_mainImg_wrapper">
                                            <img className="houselist_item_mainImg" src={item.imageURLs[0]} alt=""/>
                                        </div>
                                        <div className="houselist_item_info_wrapper">
                                            <div className="houselist_item_info_title">{item.title}</div>
                                            <div className="houselist_item_info_price">
                                                <i className="iconfont icon-RMB"/>
                                                {item.price}{item.saleType === "sale"? '万元':(item.rentType === 'shortRent'? '/日':'/月')}
                                            </div>
                                            <div className="houselist_item_info_count">
                                                <span style={{marginRight: '.1rem'}}>浏览{item.browsedCount}</span>
                                                <span>收藏{item.collectedCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="houselist_item_footer">
                                    </div>
                                </List.Item>
                            </List>
                            <WhiteSpace/>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

// 从redux中取出登录信息
const mapStateToProps = (state) => {
    return {
        logInfo: state.login
    }
  }

//   将登录信息以props的形式传入
HouseList = connect(mapStateToProps)(HouseList);

export default HouseList;