import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import Login from './components/login/loginbyaccount/loginbyaccount';
import Register from './components/resgister/resgisterbyaccount/resgisterbyaccount';
import UserCenter from './components/user/userCenter';
import CollectionList from './components/user/userPages/collectionList';
import OrderList from './components/user/userPages/orderList';
import UserSafety from './components/user/userPages/userSafety';
import UseSetting from './components/user/userPages/userSetting';
import HouseList from './components/user/userPages/houseList';
import UserCard from './components/user/userPages/userCard';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import { BrowserRouter, Route} from 'react-router-dom';

let store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path='/' component={App}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route exact path='/usercenter' component={UserCenter}/>
            <Route path='/usercenter/collectionList' component={CollectionList}/>
            <Route path='/usercenter/orderList' component={OrderList}/>
            <Route path='/usercenter/userSafety' component={UserSafety}/>
            <Route path='/usercenter/userSetting' component={UseSetting}/>
            <Route path='/usercenter/userCard' component={UserCard}/>
            <Route path='/usercenter/houseList' component={HouseList}/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
