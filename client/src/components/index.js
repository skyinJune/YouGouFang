import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import { add, remove, addAsync, logout} from '../actions/index';
import 'whatwg-fetch';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta:{}
        };
        this.showList = this.showList.bind(this);
        this.saveTest = this.saveTest.bind(this);
    }

    componentDidMount() {
        this.showList();
    }

    showList() {
        fetch('/show').then(response => response.json())
        .then(data => {this.setState({meta: data})})
        .catch(e => console.log("Oops, error", e))
    }

    saveTest() {
        var json = {
            "title": 'test title',
            'pictures': ['p1','p2'],
            'type': ['t1', 't2'],
            'infomations': ['i1', 'i2'],
            'description': 'test des'
          };
          var data = JSON.stringify(json);
          fetch('/save', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
          }).then(response => response.json())
          .then(data => console.log(data));
    }


    render() {
        const redirectToLogin = <Redirect to="/login"/>;
        const homePage = <div>
                            <h2>hello, {this.props.logInfo.user}</h2>
                            <h2>the current number is{this.props.num}</h2>
                            <Button type='primary' onClick={this.props.add}>add</Button>
                            <Button type="warning" onClick={this.props.remove}>remove</Button>
                            <Button type="ghost" onClick={this.props.addAsync}>add in 2 seconds</Button>
                            <Button type="warning" onClick={this.props.logout}>logout</Button>
                        </div>;
        return this.props.logInfo.isLogin? homePage :redirectToLogin
    }
}

const mapStateToProps = (state) => {
    return {
        num: state.counter,
        logInfo: state.login    
    }
  }
  const actionCreater = { add, remove, addAsync, logout};
  Index = connect(mapStateToProps, actionCreater)(Index);

export default Index;