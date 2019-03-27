import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/login'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import { BrowserRouter, Route} from 'react-router-dom'

let store = createStore(rootReducer, applyMiddleware(thunk));
console.log(store.getState())

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path='/' component={App}/>
            <Route path='/login' component={Login}/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
