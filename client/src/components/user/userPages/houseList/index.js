import React, {Component} from 'react'
import './index.css'
import {List, WhiteSpace} from 'antd-mobile'
import { connect } from 'react-redux'
import {getTimeStr} from '../../../../utils'
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
            houseList: [],
            isLoading: true
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
            if(houseList.length) {
                this.fetchHouseList(houseList);
            }
            else {
                this.setState({isLoading: false})
            }
            
        })
    }

    fetchHouseList(houseList) {
        let tempList = [];
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
                tempList.push(data);
                if(tempList.length === houseList.length) {
                    tempList.sort((a, b)=>(
                        new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
                        ));
                    this.setState({houseList: tempList, isLoading: false});
                }
            })
        })
    }

    render() {
        return (
            <div>
                <div className="houselist_header_wrapper">
                    {/* 点击返回 */}
                    <div className="houselist_header_icon_wrapper"
                        onClick={()=>this.props.history.push("/userCenter")}
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
                        this.state.isLoading? 
                        <div className="recommend_loading_wrapper">
                            <div className="recommend_loading_img_wrapper">
                                <img className="recommend_loading_img" 
                                    src="https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_recommend_loading/loading.gif"
                                    alt=""
                                />
                            </div>
                        </div>
                        :this.state.houseList.length === 0? 
                            <div className="houselist_empty_wrapper">
                                <div className="houselist_empty_icon_wrapper"><i className="iconfont icon-emizhifeiji houselist_empty_icon"/></div>
                                <div className="houselist_empty_words">你还没有发布房源哦，快去发布吧~</div>
                            </div>
                        :(this.state.houseList.map(item=>(
                                <div key={item._id}>
                                <List>
                                    <List.Item onClick={()=>this.props.history.push('/housePage?_id=' + item._id)} arrow="horizontal">
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
                                    </List.Item>
                                    <List.Item>
                                        <div className="houselist_item_footer">
                                            <div className="houselist_item_footer_publishTime">{getTimeStr(item.publishTime)}发布</div>
                                            <div className="houselist_item_footer_operationWrapper">
                                                <div className="houselist_item_footer_operation" onClick={()=>console.log('item footer 降价 clicked')}>降价</div>
                                                <div className="houselist_item_footer_operation" onClick={()=>console.log('item footer ellipsis clicked')}><i className="iconfont icon-ellipsis"/></div>
                                            </div>
                                        </div>
                                    </List.Item>
                                </List>
                                <WhiteSpace/>
                                </div>
                        )))
                        
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