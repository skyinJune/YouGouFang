import React, {Component} from 'react'
import './index.css'
import CommonHeader from '../commonComponents/commonHeader'
import {getUrlParams} from '../../utils'
import {TextareaItem} from 'antd-mobile'

class CommentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_id: getUrlParams().order_id,
            type: getUrlParams().type,
            comment: ''
        }
    }

    render() {
        return (
            <div>
                <CommonHeader  history={this.props.history} title="评价"/>
                <div className="commentPage_main_wrapper">
                <TextareaItem style={{fontSize: '.12rem'}}
                    onChange={val=>console.log(val)}
                    placeholder="此次看房体验如何呢？"
                    rows={4}
                />
                </div>
            </div>
        )
    }

}

export default CommentPage