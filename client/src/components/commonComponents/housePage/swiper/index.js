import React, {Component} from 'react'
import './index.css'
import Swiper from 'swiper/dist/js/swiper.js'

/**
 *  housPage Swiper卡片
 *
 * @class HomePageSwiper
 * @extends {Component}
 */
class HomePageSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURLs: []
        }
    }

    componentWillReceiveProps(props) {
        this.setState({imageURLs: props.imageURLs})
    }

    componentDidUpdate() {
        // 初始化swiper
        this.HousePage_Swiper = new Swiper ('.swiper-container', {
            loop: false,  //循环
            autoplay: false,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
                autoplay: true
              },
        })
    }

    componentWillUnmount() {
        if(this.HousePage_Swiper) {
            this.HousePage_Swiper.destroy();
        }
    }

    render() {
        return (
            <div className="housePage_swiper_wrapper">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                    {
                        this.state.imageURLs?
                        this.state.imageURLs.map(item=>(
                            <div className="swiper-slide housePage_swiper_slide"
                                key={item}
                            >
                                <img src={item} className="housePage_swiper_slide_img" alt=""/>
                            </div>
                        ))
                        :null
                    }
                    </div>
                    <div className="swiper-pagination hosePage_swiper_pagination"></div>
                </div>
            </div>
        )
    }
}

export default HomePageSwiper