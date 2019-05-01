import React, {Component} from 'react'
import './index.css'

const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;

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
        window.addEventListener('scroll', ()=>this.onScroll());
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', ()=>this.onScroll());
    }

    onScroll() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let headerStyle = {};
        if(scrollTop <= (clientWidth*0.6 - 50)) {
            let colorValue = Math.round(scrollTop/(clientWidth*0.6 - 50)*255);
            headerStyle = {
                'backgroundColor': `rgb(255, 255, 255, ${scrollTop/(clientWidth*0.6 - 50)})`,
                'color': `rgb(${255-colorValue}, ${255-colorValue}, ${255-colorValue})`
            }
            this.setState({headerStyle: headerStyle});
        }
        else {
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