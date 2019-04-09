import React, {Component} from 'react';
import { TabBar, Popover } from 'antd-mobile';
import './index.css'

// Tab信息
const tabs = [
    {title: '首页', icon: 'icon-home', to: '/' },
    {title: '发现', icon: 'icon-faxian', to: '/explorePage' },
    {title: '', icon: '', to: '/publishPage' },
    {title: '消息', icon: 'icon-iconfontzhizuobiaozhun023110', to: '/messagePage' },
    {title: '我的', icon: 'icon-wode', to: '/userCenter' },
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
            selected: '/',
            publishClicked: false
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div className="bottomNavi_wrapper">
                    <TabBar>
                        {
                            tabs.map((item)=> 
                                // 每一个Tab的信息
                                <TabBar.Item
                                    title={item.title}
                                    key={item.to}
                                    onPress={()=>{
                                        this.setState({selected: item.to});
                                        if(item.to === '/publishPage') {
                                            return
                                        }
                                        else {
                                            this.props.history.push(item.to)
                                        }
                                    }}
                                    selected={this.state.selected === item.to}
                                    icon={<i className={item.icon + ' iconfont bottomNavi_tabIcon'}/>}
                                    selectedIcon={<i className={item.icon + ' iconfont bottomNavi_tabIcon icon_selected'}/>}

                                />
                            )
                        }
                    </TabBar>
                </div>
                <Popover mask={true}
                    align={{
                        overflow: { adjustY: true, adjustX: true },
                        offset: [-10, 10],
                      }}
                    overlay={[
                        (<Popover.Item>发布售房</Popover.Item>),
                        (<Popover.Item>发布租房</Popover.Item>)
                    ]}
                    onVisibleChange={()=> {
                        this.setState({publishClicked: !this.state.publishClicked});
                        }}
                >
                    <div className="center_publish_wrapper" 
                        >
                        <div className="center_publish_icon_wrapper">
                            <i className={(this.state.publishClicked? 'icon-cuo' : 'icon-jiahao2fill center_publish_icon_jiahao') + ' iconfont center_publish_icon'}/>
                        </div>
                        <div className="center_publish_word">发布</div>
                    </div>
                </Popover>
            </div>
        )
    }
}

export default BottomNavi;