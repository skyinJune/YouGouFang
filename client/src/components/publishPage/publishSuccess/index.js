import React, {Component} from 'react'
import './index.css'

// 记录inteval的id,方便Unmount的时候clear
let timer;

/**
 *  发布成功的结果页
 *
 * @class PublishSuccess
 * @extends {Component}
 */
class PublishSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countDown: 5
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
            <div className="publishSuccess_wrapper">
                <div><i className="iconfont icon-wancheng publishSuccess_icon"/></div>
                <div className="publishSuccess_title">发布成功</div>
                <div className="publishSuccess_jumpWrapper">
                    {this.state.countDown}秒后返回主页
                    <span className="publishSuccess_jumptoHouseList"
                        onClick={()=>this.props.history.push('/houseList')}
                    >
                        去看我刚发布的
                        <i className="iconfont icon-icon--"/>
                    </span>
                </div>
            </div>
        )
    }
}

export default PublishSuccess