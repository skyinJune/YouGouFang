import React, {Component} from 'react'
import './index.css'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import BasicInfo from './basicInfo'
import SecondInfo from './secondInfo'
import List from './list'
import {Toast} from 'antd-mobile'
import 'whatwg-fetch'
import {listAssign} from '../../../utils'

class UserCenterIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        }
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
    }
    componentDidMount() {
        this.fetchUserInfo();
    }

    fetchUserInfo() {

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
            this.setState({userData: data});
            Toast.hide();
        })
    }

    render() {
        let basicInfo = {account: '', avatar: '', introduction: '', userType: 0, isCertificationPassed: false},
            secondInfo = {starLevel: -1, followList: [], fansList:[]},
            listInfo = {collectionList: [], houseList: [], orderList: []};
            listAssign(basicInfo, this.state.userData);
            listAssign(secondInfo, this.state.userData);
            listAssign(listInfo, this.state.userData);
        return (
            <div className="usercenter_index_wrapper">
                {
                    this.props.logInfo.isLogin? null : <Redirect to="/login"/>
                }
                
                <BasicInfo basicInfo={basicInfo}></BasicInfo>
                <SecondInfo secondInfo={secondInfo}></SecondInfo>
                <List listInfo={listInfo}></List>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logInfo: state.login    
    }
  }
  UserCenterIndex = connect(mapStateToProps)(UserCenterIndex);

export default UserCenterIndex;