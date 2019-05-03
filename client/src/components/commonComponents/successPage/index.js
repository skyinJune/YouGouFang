import React, {Component} from 'react'
import './index.css'
import {getUrlParams} from '../../../utils'

// 记录inteval的id,方便Unmount的时候clear
let timer;

/**
 *  成功的结果页
 *
 * @class SuccessPage
 * @extends {Component}
 */
class SuccessPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countDown: 5,
            type: getUrlParams().type
        }
        this.onCountDown = this.onCountDown.bind(this);
    }

    /**
     *  计时函数
     *
     * @memberof PublishSuccess
     */
    onCountDown() {
        timer = setInterval(()=>{
            // 如果倒数没有结束，则继续倒数
            if(this.state.countDown > 1) {
                this.setState({countDown: this.state.countDown - 1})
            }

            // 倒数结束直接跳首页
            else {
                this.props.history.push('/');
            }
        }, 1000)
    }

    componentWillUnmount() {
        // clear interval
        clearInterval(timer);
    }

    render() {
        // 如果countDown为5(即刚开始倒数)则执行onCountDown函数，否则onCountDown函数中setState后render会执行会再次调用onCountDown
        if(this.state.countDown === 5){
            this.onCountDown();
        }
        return (
            <div className="successPage_wrapper">
                <div><i className="iconfont icon-wancheng successPage_icon"/></div>
                <div className="successPage_title">{this.state.type === 'publish'? '发布' :'预约'}成功</div>
                <div className="successPage_jumpWrapper">
                    {this.state.countDown}秒后返回主页
                    <span className="successPage_jumptoHouseList"
                        onClick={()=>this.props.history.push(this.state.type === 'publish'?'/houseList':'/orderList')}
                    >
                        去看我刚{this.state.type === 'publish'? '发布' :'预约'}的
                        <i className="iconfont icon-icon--"/>
                    </span>
                </div>
            </div>
        )
    }
}

export default SuccessPage