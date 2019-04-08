import React, {Component} from 'react';
import { Tabs, Badge } from 'antd-mobile';

const tabs = [
    { title: <Badge>首页</Badge> },
    { title: <Badge text={'今日(20)'}>发现</Badge> },
    { title: <Badge >发布</Badge> },
    { title: <Badge dot>消息</Badge> },
    { title: <Badge dot>我的</Badge> },
  ];

class BottomNavi extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Tabs tabs={tabs}
                    initialPage={1}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                </Tabs>
            </div>
        )
    }
}

export default BottomNavi;