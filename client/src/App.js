import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import {Route, Switch} from 'react-router-dom';
import BottomNavi from './components/bottomNavi';
import HomePage from './components/homePage';
import ExplorePage from './components/explorePage';
import MessagePage from './components/messagePage';
import UserCenter from './components/user';

class App extends Component {
  render() {
    return (
      <div>
        <div>
            <Switch>
                {/* 主页面的子页面首页的路由 */}
                <Route path='/' exact component={HomePage}/>

                {/* 主页面的子页面发现页的路由 */}
                <Route path='/explorePage' component={ExplorePage}/>

                {/* 主页面的子页面消息页的路由 */}
                <Route path='/messagePage' component={MessagePage}/>

                {/* 主页面的子页面用户页的路由 */}
                <Route path='/userCenter' component={UserCenter}/>
            </Switch>
        </div>

        {/* 底部tab组件 需要把history传进去才能用history的方法 */}
        <BottomNavi history={this.props.history}></BottomNavi>
      </div>
    );
  }
}

export default App;
