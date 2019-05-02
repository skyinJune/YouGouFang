import React, {Component} from 'react'
import './index.css'
import {getUrlParams} from '../../utils'

class BookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownerAccount: getUrlParams().ownerAccount,
            buyerAccount: getUrlParams().buyerAccount,
        }
    }

    render() {
        return (
            <div>
                <div>
                </div>
            </div>
        )
    }
}

export default BookingPage