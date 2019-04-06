import React, {Component} from 'react'
import './index.css'
import BasicInfo from './basicInfo'
import SecondInfo from './secondInfo'
import List from './list'

class UserCenterIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="usercenter_index_wrapper">
                <BasicInfo></BasicInfo>
                <SecondInfo></SecondInfo>
                <List></List>
            </div>
        )
    }
}

export default UserCenterIndex;