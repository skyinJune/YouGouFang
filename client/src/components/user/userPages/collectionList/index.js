import React, {Component} from 'react'
import {Icon} from 'antd-mobile';

/**
 *  我的收藏组件
 *
 * @class CollectionList
 * @extends {Component}
 */
class CollectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                {/* 点击返回 */}
                <Icon type="left" size="lg" onClick={()=>this.props.history.goBack()}/>
                CollectionList
            </div>
        )
    }
}

export default CollectionList;