import React, {Component} from 'react'
import Header from './header'
import Swiper from './swiper'

/**
 *  首页
 *
 * @class HomePage
 * @extends {Component}
 */
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <Swiper/>
            </div>
        )
    }
}

export default HomePage;