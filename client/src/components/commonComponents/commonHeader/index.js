import React, {Component} from 'react'
import './index.css'

class CommonHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="commonHeader_wrapper">
                {/* 点击返回 */}
                <div className="commonHeader_header_icon_wrapper"
                    onClick={()=>this.props.history.goBack()}
                >
                    <i className="iconfont icon-zuo commonHeader_header_icon"/>
                </div>
                <div className="commonHeader_header_title">{this.props.title}</div>
            </div>
        )
    }
}

export default CommonHeader