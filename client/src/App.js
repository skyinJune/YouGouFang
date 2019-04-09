import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import {Route, Switch} from 'react-router-dom';
import BottomNavi from './components/bottomNavi';
import HomePage from './components/homePage';
import ExplorePage from './components/explorePage';
import PublishPage from './components/publishPage';
import MessagePage from './components/messagePage';
import UserCenter from './components/user';

class App extends Component {
  render() {
    return (
      <div>
        <div>
            <Switch>
                <Route path='/' exact component={HomePage}/>
                <Route path='/explorePage' component={ExplorePage}/>
                <Route path='/publishPage' component={PublishPage}/>
                <Route path='/messagePage' component={MessagePage}/>
                <Route path='/userCenter' component={UserCenter}/>
            </Switch>
        </div>
        <BottomNavi history={this.props.history}></BottomNavi>
      </div>
    );
  }
}

export default App;
