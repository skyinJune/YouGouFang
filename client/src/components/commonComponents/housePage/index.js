import React, {Component} from 'react'
import './index.css'
import {Toast} from 'antd-mobile'
import {getUrlParams} from '../../../utils'
import 'whatwg-fetch'
import { connect } from 'react-redux'

const _id = getUrlParams()._id;
const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;

class HousePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houseInfo: {},
            isCollected: false,
            headerStyle: {}
        }
        this.fetchHouseInfo = this.fetchHouseInfo.bind(this);
        this.onCollectClicked = this.onCollectClicked.bind(this);
        this.checkCollected = this.checkCollected.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        this.fetchHouseInfo();
        if(this.props.logInfo.isLogin) {
            this.checkCollected();
        }
        window.addEventListener('scroll', ()=>this.onScroll());
    }

    fetchHouseInfo() {
        let search = {
            _id: _id,
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
            if(data.collectionList.indexOf(_id)>=0) {
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
        if(!this.props.logInfo.isLogin) {
            Toast.info('登录后收藏房源哦~', 2);
            this.props.history.push('/login');
        }
        else {
            this.setState({isCollected: !this.state.isCollected},()=>{
                let collectInfo = {
                    _id: _id,
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

    onScroll() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let headerStyle = {};
        if(scrollTop <= (clientWidth*0.6 - 50)) {
            // let colorValue = Math.round(255-255/50*i)
            headerStyle = {
                'backgroundColor': `rgb(255, 255, 255, ${scrollTop/(clientWidth*0.6 - 50)})`,
                'color': '#fff'
            }
            this.setState({headerStyle: headerStyle});
        }
        else {
            headerStyle = {
                'backgroundColor': '#fff',
                'color': '#000'
            }
            this.setState({headerStyle: headerStyle});
        }
        
    }

    render() {
        // let houseInfo = this.state.houseInfo;
        return (
            <div>
                <div className="houseInfo_header_wrapper" style={this.state.headerStyle}>
                    {/* 点击返回 */}
                    <div className="houseInfo_header_leftIcon_wrapper"
                        onClick={()=>this.props.history.goBack()}
                    >
                        <i className="iconfont icon-zuo houseInfo_header_leftIcon"/>
                    </div>
                    <div className="houseInfo_header_share_wrapper"
                        onClick={()=>console.log('share')}
                    >
                        <i className="iconfont icon-fenxiang houseInfo_header_shareIcon"/>
                    </div>
                    <div className="houseInfo_header_collect_wrapper"
                        onClick={()=>this.onCollectClicked()}
                    >
                        <i className="iconfont icon-buoumaotubiao45 houseInfo_header_collectIcon"/>
                    </div>
                </div>
                <div className="houseInfo_swiper_wrapper">
                </div>
                <div className="houseInfo_swiper_wrapper">
                </div>
                <div className="houseInfo_swiper_wrapper">
                </div>
                <div className="houseInfo_swiper_wrapper">
                </div>
                <div className="houseInfo_swiper_wrapper">
                </div>
                <div className="houseInfo_swiper_wrapper">
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
HousePage = connect(mapStateToProps)(HousePage);

export default HousePage;