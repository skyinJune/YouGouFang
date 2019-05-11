import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import Login from './components/login/loginbyaccount/loginbyaccount';
import Register from './components/resgister/resgisterbyaccount/resgisterbyaccount';
import PublishPage from './components/publishPage';
import CitySelect from './components/citySelect';
import CollectionList from './components/user/userPages/collectionList'
import HouseList from './components/user/userPages/houseList'
import OrderList from './components/user/userPages/orderList'
import UserCard from './components/user/userPages/userCard'
import UserSafety from './components/user/userPages/userSafety'
import UserSetting from './components/user/userPages/userSetting'
import HousePage from './components/commonComponents/housePage'
import BookingPage from './components/bookingPage'
import SuccessPage from './components/commonComponents/successPage'
import CommentPage from './components/commentPage'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// redux的store初始化
let store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>

                {/* 登录页的路由 */}
                <Route path='/login' component={Login}/>

                {/* 注册页路由 */}
                <Route path='/register' component={Register}/>
                
                {/* 发布页路由 */}
                <Route path='/publishPage' component={PublishPage}/>

                {/* 城市选择页路由 */}
                <Route path='/citySelect' component={CitySelect}/>

                {/* 我的收藏页面的路由 */}
                <Route path='/collectionList' component={CollectionList}/>

                {/* 我发布的页面的路由 */}
                <Route path='/houseList' component={HouseList}/>

                {/* 我的订单页面的路由 */}
                <Route path='/orderList' component={OrderList}/>

                {/* 用户卡片页面的路由 */}
                <Route path='/userCard' component={UserCard}/>

                {/* 安全中心页面的路由 */}
                <Route path='/userSafety' component={UserSafety}/>

                {/* 设置页面的路由 */}
                <Route path='/userSetting' component={UserSetting}/>

                {/* 房源详情页面的路由 */}
                <Route path='/housePage' component={HousePage}/>

                {/* 预约看房页面的路由 */}
                <Route path='/bookingPage' component={BookingPage}/>

                {/* 成功结果页面的路由 */}
                <Route path='/successPage' component={SuccessPage}/>

                {/* 评价页面的路由 */}
                <Route path='/commentPage' component={CommentPage}/>

                {/* 主页路由 */}
                <Route path='/' component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
