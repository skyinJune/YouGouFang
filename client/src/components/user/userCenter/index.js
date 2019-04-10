import React, {Component} from 'react'
import './index.css'
import { connect } from 'react-redux'
import BasicInfo from './basicInfo'
import SecondInfo from './secondInfo'
import List from './list'
import {Toast} from 'antd-mobile'
import 'whatwg-fetch'
import {listAssign} from '../../../utils'

/**
 *  用户中心页
 *
 * @class UserCenterIndex
 * @extends {Component}
 */
class UserCenterIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        }
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
    }

    /**
     *  页面挂载而未渲染时发送请求
     *
     * @memberof UserCenterIndex
     */
    componentDidMount() {
        if(this.props.logInfo.isLogin) {
            this.fetchUserInfo();
        }
        else {
            this.props.history.push('/login')
        }
        
    }

    /**
     *  发送请求的函数
     *
     * @memberof UserCenterIndex
     */
    fetchUserInfo() {

        // 发送请求时的加载态
        Toast.loading('加载用户数据...');

        const logInfo = {
            account: this.props.logInfo.user
        };

        // 转换为Json字符串
        const data = JSON.stringify(logInfo);

        fetch('/getUserInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
        }).then(response => response.json())
        .then(data=>{
            // 将取到的数据存入state
            this.setState({userData: data});

            // 取到数据之后隐藏加载态
            Toast.hide();
        })
    }

    render() {

        // 将请求到的数据分发给每个组件
        let basicInfo = {account: '', avatar: '', introduction: '', userType: 0, isCertificationPassed: false},
            secondInfo = {starLevel: -1, followList: [], fansList:[]},
            listInfo = {collectionList: [], houseList: [], orderList: []};
            listAssign(basicInfo, this.state.userData);
            listAssign(secondInfo, this.state.userData);
            listAssign(listInfo, this.state.userData);

        return (
            <div className="usercenter_index_wrapper">
                {/* 用户基本信息组件 */}
                <BasicInfo basicInfo={basicInfo}></BasicInfo>

                {/* 用户第二信息 */}
                <SecondInfo secondInfo={secondInfo}></SecondInfo>

                {/* 用户的列表信息 */}
                <List listInfo={listInfo}></List>
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
UserCenterIndex = connect(mapStateToProps)(UserCenterIndex);

export default UserCenterIndex;