import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import Login from './components/login/loginbyaccount/loginbyaccount';
import Register from './components/resgister/resgisterbyaccount/resgisterbyaccount';
import UserCenter from './components/user/userCenter'
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
            <Route path='/usercenter' component={UserCenter}/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
