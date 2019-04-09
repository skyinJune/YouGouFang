import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import Login from './components/login/loginbyaccount/loginbyaccount';
import Register from './components/resgister/resgisterbyaccount/resgisterbyaccount';
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

                {/* 主页路由 */}
                <Route path='/' component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
