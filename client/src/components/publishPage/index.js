import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import PublishComponent from './publishComponent'
import CommunitySelect from './communitySelect'
import PublishSuccess from './publishSuccess'

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
                    <Route path='/publishPage/publishSuccess' component={PublishSuccess}/>
                </Switch>
            </div>
        )
    }
}

export default PublishPage;