import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add, remove, addAsync} from './actions/index';

class App extends Component {
  render() {
    return (
      <div>
        <h2>the current number is {this.props.num}</h2>
        <button onClick={this.props.add}>add</button>
        <button onClick={this.props.remove}>remove</button>
        <button onClick={this.props.addAsync}>add in 2 seconds</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {num: state}
}
const actionCreater = { add, remove, addAsync};
App = connect(mapStateToProps, actionCreater)(App);

export default App;
