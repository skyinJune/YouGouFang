import React, {Component} from 'react';
import {Icon} from 'antd-mobile';

/**
 *  发布租房页的组件
 *
 * @class RentPage
 * @extends {Component}
 */
class RentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Icon type="left" size="lg" onClick={()=>this.props.history.goBack()}/>
                RentPage
            </div>
        )
    }
}

export default RentPage;