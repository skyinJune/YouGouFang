import React, {Component} from 'react'
import Header from './header'
import Swiper from './swiper'
import BasicInfo from './basicInfo'
import Description from './description'
import MapCard from './mapCard'
import UserCard from './userCard'
import Footer from './footer'
import {Toast} from 'antd-mobile'
import {getUrlParams} from '../../../utils'
import 'whatwg-fetch'
import { connect } from 'react-redux'

/**
 *  房源详情页
 *
 * @class HousePage
 * @extends {Component}
 */
class HousePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: getUrlParams()._id,
            houseInfo: {},
            isCollected: false,
        }
        this.fetchHouseInfo = this.fetchHouseInfo.bind(this);
        this.onCollectClicked = this.onCollectClicked.bind(this);
        this.checkCollected = this.checkCollected.bind(this);
        this.onBookingClicked = this.onBookingClicked.bind(this);
        this.onChatClicked = this.onChatClicked.bind(this);
    }

    componentDidMount() {
        this.fetchHouseInfo();

        // 如果没登陆就不检查是否被当前登录的用户收藏
        if(this.props.logInfo.isLogin) {
            this.checkCollected();
        }
    }

    /**
     *  拉取房源信息
     *
     * @memberof HousePage
     */
    fetchHouseInfo() {
        let search = {
            _id: this.state._id,

            // 这里区别其他getHouseInfo的请求，只要housePage展示一次就加一次浏览量,具体逻辑在服务端中写好了
            browsed: true
        };

        let data = JSON.stringify(search);

        Toast.loading('加载中');

        fetch('/getHouseInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
          }).then(response => response.json())
          .then(data => {
            this.setState({houseInfo: data});
            Toast.hide();
          });
    }

    /**
     *  检查用户是否收藏了这个房源
     *
     * @memberof HousePage
     */
    checkCollected() {
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
            if(data.collectionList.indexOf(this.state._id)>=0) {
                this.setState({isCollected: true});
            }
        })
    }

    /**
     *  收藏按钮被点击之后
     *
     * @memberof HousePage
     */
    onCollectClicked() {
        // 如果没登陆就直接跳转登录
        if(!this.props.logInfo.isLogin) {
            Toast.info('登录后收藏房源哦~', 2);
            this.props.history.push('/login');
        }
        else {
            // 直接对state状态中的isCollected取反，然后再发送collectHouse的请求，收藏和取消收藏的逻辑在服务端写好了
            this.setState({isCollected: !this.state.isCollected},()=>{
                let collectInfo = {
                    _id: this.state._id,
                    account: this.props.logInfo.user,
                    isCollected: this.state.isCollected
                }
                const data = JSON.stringify(collectInfo);
                fetch('/collectHouse', {
                    method:'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body:data
                }).then(response => response.json())
            });
        }
    }

    onBookingClicked() {
        if(!this.props.logInfo.isLogin) {
            Toast.info('登录后才可以预约看房哦~', 2);
            this.props.history.push('/login');
        }
        else {
            let pushPath = '/bookingPage?house_id=' + 
                this.state._id + '&buyerAccount=' + this.props.logInfo.user;
            this.props.history.push(pushPath);
        }
    }

    onChatClicked() {
        if(!this.props.logInfo.isLogin) {
            Toast.info('登录后才可以聊天哦~', 2);
            this.props.history.push('/login');
        }
        else {
            console.log('chat clicked')
        }
    }

    render() {
        return (
            <div>
                <Header onCollectClicked={()=>this.onCollectClicked()} goBack={()=>this.props.history.goBack()} isCollected={this.state.isCollected}/>
                <Swiper imageURLs={this.state.houseInfo.imageURLs}/>
                <BasicInfo houseInfo={this.state.houseInfo}/>
                <Description houseInfo={this.state.houseInfo}/>
                <MapCard position={this.state.houseInfo.position}/>
                <UserCard ownerAccount={this.state.houseInfo.ownerAccount}/>

                {/* 如果浏览的用户是这个房源的房主就不显示底下的按钮了 */}
                {
                    this.props.logInfo.user === this.state.houseInfo.ownerAccount?null
                    :<Footer onBookingClicked={()=>this.onBookingClicked()} onChatClicked={()=>this.onChatClicked()}/>
                }
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
HousePage = connect(mapStateToProps)(HousePage);

export default HousePage;