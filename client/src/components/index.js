import React, { Component } from 'react';
import {Button} from 'antd-mobile';
import Login from './login'
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
        return (
            <div>
                <Login></Login>
                <Button type='primary' onClick={this.saveTest}>test save</Button>
            </div>
        )
    }
}

export default Index;