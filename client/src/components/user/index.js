import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import UserCenter from './userCenter'

/**
 *  用户页的组件
 *
 * @class User
 * @extends {Component}
 */
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                {/* 是否已登录，未登录直接跳转到登录页 */}
                {this.props.logInfo.isLogin? null : <Redirect to="/login"/>}
                <Switch>
                    {/* 进入到用户页时默认展示userCenter页面 */}
                    <Route path='/userCenter' exact component={UserCenter}/>
                </Switch>
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
  User = connect(mapStateToProps)(User);

export default User;