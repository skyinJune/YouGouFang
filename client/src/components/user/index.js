import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import UserCenter from './userCenter'
import CollectionList from './userPages/collectionList'
import HouseList from './userPages/houseList'
import OrderList from './userPages/orderList'
import UserCard from './userPages/userCard'
import UserSafety from './userPages/userSafety'
import UserSetting from './userPages/userSetting'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                {this.props.logInfo.isLogin? null : <Redirect to="/login"/>}
                <Switch>
                    <Route path='/userCenter' exact component={UserCenter}/>
                    <Route path='/userCenter/collectionList' component={CollectionList}/>
                    <Route path='/userCenter/houseList' component={HouseList}/>
                    <Route path='/userCenter/orderList' component={OrderList}/>
                    <Route path='/userCenter/userCard' component={UserCard}/>
                    <Route path='/userCenter/userSafety' component={UserSafety}/>
                    <Route path='/userCenter/userSetting' component={UserSetting}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logInfo: state.login
    }
  }
  User = connect(mapStateToProps)(User);

export default User;