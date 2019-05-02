import React, {Component} from 'react'
import './index.css'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="housePage_footer_wrapper">
                <div className="housePage_footer_leftButton" onClick={()=>this.props.onOrderClicked()}>预定房源</div>
                <div className="housePage_footer_rightButton" onClick={()=>this.props.onChatClicked()}>聊一聊</div>
            </div>
        )
    }
}

export default Footer