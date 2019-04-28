import React, {Component} from 'react'
import './index.css'

class CityCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let houseInfo = this.props.houseInfo;
        let avergePrice = Math.floor(houseInfo.price/houseInfo.houseArea*10000);
        return(
            <div className="city_card_wrapper">
                <div className="city_card_mainImg_wrapper">
                    <img className="city_card_mainImg" src={houseInfo.imageURLs[0]} alt=""/>
                </div>
                <div className="city_card_info_wrapper">
                    <div className="city_card_info_title">{houseInfo.title}</div>
                    <div className="city_card_info_layoutArea">
                        {houseInfo.houseLayout.map(item=>(item))}/
                        {houseInfo.houseArea}m<sup className="city_card_info_layoutArea_sup">2</sup>
                    </div>
                    <div className="city_card_info_price_wrapper">
                        <div className="city_card_info_price">
                            <i className="iconfont icon-RMB"/>
                            {houseInfo.price}
                            {houseInfo.saleType === "sale"? '万元':(houseInfo.rentType === 'shortRent'? '/日':'/月')}
                        </div>
                        {houseInfo.saleType === "sale"? 
                            <div className="city_card_info_price_avergePrice">
                                {avergePrice}
                                元/m<sup className="city_card_info_layoutArea_sup">2</sup>
                            </div>
                            :null}
                    </div>
                </div>
            </div>
        )
    }
}

export default CityCard;
