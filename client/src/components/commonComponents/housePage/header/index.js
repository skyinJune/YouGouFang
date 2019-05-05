import React, {Component} from 'react'
import './index.css'

// 获取界面的宽度
const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;

/**
 *  housePage Header部分
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerStyle: {
                'color': '#fff'
            }
        }
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        // 添加scroll监听事件，绑定onScroll函数来改变header的样式
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        // 卸载组件的时候移除scroll监听
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        // 获得滚动条的当前高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        // 样式初始化
        let headerStyle = {};

        // 高度如果小于clientWidth*0.3 - 50(大概是到轮播部分的高度的一半的位置)
        if(scrollTop <= (clientWidth*0.3 - 50)) {
            // 随高度改变的色值
            let colorValue = Math.round(scrollTop/(clientWidth*0.3 - 50)*255);

            // 一开始是rgb(255, 255, 255, 0)透明的黑色背景色
            headerStyle = {
                'backgroundColor': `rgb(255, 255, 255, ${scrollTop/(clientWidth*0.3 - 50)})`,
                'color': `rgb(${255-colorValue}, ${255-colorValue}, ${255-colorValue})`
            }
            this.setState({headerStyle: headerStyle});
        }
        else {
            // 白底黑字
            headerStyle = {
                'backgroundColor': '#fff',
                'color': '#000'
            }
            this.setState({headerStyle: headerStyle});
        }
    }

    render() {
        return (
            <div className="houseInfo_header_wrapper" style={this.state.headerStyle}>
                {/* 点击返回 */}
                <div className="houseInfo_header_leftIcon_wrapper"
                    onClick={()=>this.props.goBack()}
                >
                    <i className="iconfont icon-zuo houseInfo_header_leftIcon"/>
                </div>
                <div className="houseInfo_header_share_wrapper"
                    onClick={()=>console.log('share')}
                >
                    <i className="iconfont icon-fenxiang houseInfo_header_shareIcon"/>
                </div>
                <div className="houseInfo_header_collect_wrapper"
                    onClick={()=>this.props.onCollectClicked()}
                >
                    <i className={"iconfont houseInfo_header_collectIcon " + (this.props.isCollected? 'icon-star': 'icon-buoumaotubiao45')}/>
                </div>
            </div>
        )
    }
}

export default Header