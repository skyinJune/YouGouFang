import React, {Component} from 'react'
import './index.css'
import {List} from 'antd-mobile'
import 'whatwg-fetch'

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerInfo: {}
        }
    }

    componentWillReceiveProps(props) {
        const ownerInfo = {
            account: props.ownerAccount
        };

        // 转换为Json字符串
        const data = JSON.stringify(ownerInfo);

        fetch('/getUserInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
        }).then(response => response.json())
        .then(data=>{
            this.setState({ownerInfo: data})
        })
    }

    render() {
        console.log(this.state.ownerInfo)
        return (
            <div className="housePage_usercard">
                <List>
                    <List.Item arrow="horizontal" onClick={()=>console.log('userCard')}>
                        <div className="housePage_usercard_wrapper">
                            <div className="housePage_usercard_leftInfo_wrapper">
                                <div className="housePage_usercard_title_wrapper">
                                    <div className="housePage_usercard_account">{this.state.ownerInfo.account}</div>
                                    <div className="housePage_usercard_userType">{this.state.ownerInfo.userType?'中介': '个人房东'}</div>
                                </div>
                                <div className="housePage_usercard_introduction">
                                    {this.state.ownerInfo.introduction?this.state.ownerInfo.introduction: '这个人什么也没有留下~'}
                                </div>
                            </div>
                            <div className="housePage_usercard_avatar_wrapper">
                                <img src={this.state.ownerInfo.avatar} alt="" className="housePage_usercard_avatar"/>
                            </div>
                        </div>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default UserCard