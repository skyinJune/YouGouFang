import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import PublishComponent from './publishComponent'
import CommunitySelect from './communitySelect'

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
                    <Route path='/publishPage/sellPage' component={PublishComponent}/>
                    <Route path='/publishPage/rentPage' component={PublishComponent}/>
                    <Route path='/publishPage/communitySelect' component={CommunitySelect}/>
                </Switch>
            </div>
        )
    }
}

export default PublishPage;