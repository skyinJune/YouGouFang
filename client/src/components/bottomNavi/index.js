import React, {Component} from 'react';
import { TabBar } from 'antd-mobile';
import './index.css'

// Tab信息
const tabs = [
    {title: '首页', icon: '', selectedIcon: '', to: '/' },
    {title: '发现', icon: '', selectedIcon: '', to: '/explorePage' },
    {title: '发布', icon: '', selectedIcon: '', to: '/publishPage' },
    {title: '消息', icon: '', selectedIcon: '', to: '/messagePage' },
    {title: '我的', icon: '', selectedIcon: '', to: '/userCenter' },
];

/**
 *  底部Tab导航组件
 *
 * @class BottomNavi
 * @extends {Component}
 */
class BottomNavi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '/'
        }
    }

    render() {
        return (
            <div className="bottomNavi_wrapper">
                <TabBar>
                    {
                        tabs.map((item)=> 
                            // 每一个Tab的信息
                            <TabBar.Item
                                title={item.title}
                                selectedIcon={item.selectedIcon}
                                key={item.to}
                                onPress={()=>{
                                    this.setState({selected: item.to});
                                    this.props.history.push(item.to);
                                }}
                                selected={this.state.selected === item.to}
                                icon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                                  />}
                                  // eslint-disable-next-line
                                selectedIcon={<div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                                  />}

                            />
                        )
                    }
                </TabBar>
            </div>
        )
    }
}

export default BottomNavi;