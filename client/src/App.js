import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import {Route, Switch} from 'react-router-dom';
// import HomePage from './components/index'
import BottomNavi from './components/bottomNavi';
import UserCenter from './components/user/userCenter';
import CollectionList from './components/user/userPages/collectionList';
import OrderList from './components/user/userPages/orderList';
import UserSafety from './components/user/userPages/userSafety';
import UseSetting from './components/user/userPages/userSetting';
import HouseList from './components/user/userPages/houseList';
import UserCard from './components/user/userPages/userCard';

class App extends Component {
  render() {
    return (
      <div>
        <div>
            <Switch>
            <Route path='/' component={UserCenter}/>
            <Route path='/usercenter' component={UserCenter}>
              <Route path='/usercenter/collectionList' component={CollectionList}/>
              <Route path='/usercenter/orderList' component={OrderList}/>
              <Route path='/usercenter/userSafety' component={UserSafety}/>
              <Route path='/usercenter/userSetting' component={UseSetting}/>
              <Route path='/usercenter/userCard' component={UserCard}/>
              <Route path='/usercenter/houseList' component={HouseList}/>
            </Route>
            </Switch>
        </div>
        <BottomNavi></BottomNavi>
      </div>
    );
  }
}

export default App;
