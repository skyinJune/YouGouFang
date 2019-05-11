import React, {Component} from 'react'
import './index.css'
import CommonHeader from '../commonComponents/commonHeader'
import {getUrlParams} from '../../utils'
import {TextareaItem} from 'antd-mobile'
import {List, Button, Toast} from 'antd-mobile'

const startList = [1, 2, 3, 4, 5];

class CommentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: getUrlParams().type,
            comment: '',
            star: 0
        }
        this.getStarCommentTitle = this.getStarCommentTitle.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    getStarCommentTitle() {
        let returnStr = '';
        if(this.state.star === 0) {
            returnStr = '给个星评吧~'
        }
        if(this.state.star === 1) {
            returnStr = '非常差!'
        }
        if(this.state.star === 2) {
            returnStr = '不太好...'
        }
        if(this.state.star === 3) {
            returnStr = '一般般~'
        }
        if(this.state.star === 4) {
            returnStr = '挺好哒~'
        }
        if(this.state.star === 5) {
            returnStr = '非常好~'
        }
        return returnStr
    }

    onButtonClicked() {
        if(!this.state.comment) {
            Toast.fail('填写评论再提交哦~', 2);
        }
        if(this.state.star === 0) {
            Toast.fail('给个星评再提交吧~', 2);
        }
        if(this.state.comment && this.state.star) {
            const comment = {
                order_id: getUrlParams().order_id,
                type: this.state.type,
                comment: this.state.comment,
                star: this.state.star
            }

            const data = JSON.stringify(comment);
            fetch('/submitComment', {
                method:'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body:data
            }).then()
        }
    }

    render() {
        return (
            <div>
                <CommonHeader  history={this.props.history} title="评价"/>
                <div className="commentPage_main_wrapper">
                    <div className="commentPage_comment_wrapper">
                        <TextareaItem style={{fontSize: '.12rem'}}
                            onChange={val=>this.setState({comment: val})}
                            placeholder={this.state.type === 'buyer'? "评价一下此次看房体验~也可以写写房子的环境、家具设施等": '评价一下房客吧~'}
                            rows={4}
                        />
                    </div>
                    <List.Item className="commentPage_star_wrapper">
                        <div className="commentPage_star_title">{this.getStarCommentTitle()}</div>
                        <div className="commentPage_star">
                        {
                            startList.map(item=>(
                                <div className="commentPage_star_item_wrapper"
                                    key={item}
                                >
                                    <i className={"iconfont commentPage_star_item " + 
                                        (item<=this.state.star? 'icon-star commentPage_star_item_yellow'
                                        : 'icon-buoumaotubiao45')}
                                        onClick={()=>this.setState({star: item})}
                                    />
                                </div>
                            ))
                        }
                        </div>
                    </List.Item>
                    <Button type='primary' onClick={()=>this.onButtonClicked()}>提交评价</Button>
                </div>
            </div>
        )
    }

}

export default CommentPage