import React, {Component} from 'react'
import './index.css'
import BMap from 'BMap'

/**
 *  housePage地图卡片
 *
 * @class MapCard
 * @extends {Component}
 */
class MapCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillReceiveProps(props) {
        // 在接收到地图所需的参数之后再初始化，不然展示不了
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