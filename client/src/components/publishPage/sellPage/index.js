import React, {Component} from 'react';
import {Icon} from 'antd-mobile';

/**
 *  发布售房页的组件
 *
 * @class SellPage
 * @extends {Component}
 */
class SellPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Icon type="left" size="lg" onClick={()=>this.props.history.goBack()}/>
                SellPage
            </div>
        )
    }
}

export default SellPage;