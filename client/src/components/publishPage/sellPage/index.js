import React, {Component} from 'react';
import CommonComponent from '../commonComponent'

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
                <CommonComponent pageType="发布售房" goBack={()=>this.props.history.goBack()}>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                    <div style={{ fontSize: '.5rem' }}>SellPage</div>
                </CommonComponent>
            </div>
        )
    }
}

export default SellPage;