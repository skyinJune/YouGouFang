import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import RentPage from './rentPage';
import SellPage from './sellPage';

/**
 *  发布页的组件
 *
 * @class PublishPage
 * @extends {Component}
 */
class PublishPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/publishPage/sellPage' component={SellPage}/>
                    <Route path='/publishPage/rentPage' component={RentPage}/>
                </Switch>
            </div>
        )
    }
}

export default PublishPage;