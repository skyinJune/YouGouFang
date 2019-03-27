import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd-mobile/dist/antd-mobile.css'
import { add, remove, addAsync} from './actions/index';
import HomePage from './components/index'

class App extends Component {
  render() {
    return (
      <div>
        <h2>the current number is{this.props.num}</h2>
        <button onClick={this.props.add}>add</button>
        <button onClick={this.props.remove}>remove</button>
        <button onClick={this.props.addAsync}>add in 2 seconds</button>
        <HomePage/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {num: state.counter}
}
const actionCreater = { add, remove, addAsync};
App = connect(mapStateToProps, actionCreater)(App);

export default App;
