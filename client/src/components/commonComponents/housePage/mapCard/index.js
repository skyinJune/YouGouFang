import React, {Component} from 'react'
import './index.css'
import BMap from 'BMap'

class MapCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillReceiveProps(props) {
        var map = new BMap.Map("container");
        let point = new BMap.Point(props.position.point.lng, props.position.point.lat);
        let marker = new BMap.Marker(point);
        map.centerAndZoom(point, 15);
        map.addOverlay(marker);
    }

    render() {
        return(
            <div className="housePage_mapCard_wrapper">
                <div id="container" style={{position: 'absolute', left: 0, height: '100%', width: '100%'}}></div> 
            </div>
        )
    }
}

export default MapCard