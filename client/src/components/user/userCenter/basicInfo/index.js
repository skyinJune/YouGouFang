import React, {Component} from 'react'
import './index.css'

class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="basicinfo_wrapper">
                <div className="basic_left_wrapper">
                    <div className="basicinfo_account">account我的小阔爱陆玥</div>
                    <div className="basicinfo_introduction">introduction</div>
                </div>
                <div className="basic_right_wrapper">
                    <div className="basic_right_icon_wrapper">
                        <i className="iconfont icon-icon-- basic_right_icon"/>
                    </div>
                    <div className="basicinfo_avatar">
                    </div>
                </div>
            </div>
        )
    }
}

export default BasicInfo;