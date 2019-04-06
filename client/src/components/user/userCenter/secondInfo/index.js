import React, {Component} from 'react'
import './index.css'

class SecondInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="second_info_wrapper">
                <div className="second_info_midThree">星级</div>
                <div className="second_info_midThree">关注数</div>
                <div className="second_info_midThree">粉丝数</div>
            </div>
        )
    }
}

export default SecondInfo;