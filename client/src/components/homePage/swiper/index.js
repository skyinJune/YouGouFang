import React, {Component} from 'react'
import './index.css'
import Swiper from 'swiper/dist/js/swiper.js'

// 先写死了，后续有管理员了再发请求
const swiperImgUrls = [
    'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_siwper_img/0.jpg',
    'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_siwper_img/1.jpg',
    'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_siwper_img/2.jpg',
    'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_siwper_img/3.jpg',
    'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_siwper_img/4.jpg',
    'https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_siwper_img/5.jpg'
]

/**
 *  首页SwiperComponent
 *
 * @class SwiperComponent
 * @extends {Component}
 */
class SwiperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // 初始化swiper
        new Swiper ('.swiper-container', {
            loop: false,  //循环
            autoplay: true,
        })
    }

    render() {
        return (
            <div className="home_swiper_wrapper">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                    {
                        swiperImgUrls.map(item=>(
                            <div className="swiper-slide home_swiper_slide"
                                key={item}
                            >
                                <img src={item} className="home_swiper_slide_img" alt=""/>
                            </div>
                        ))
                    }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default SwiperComponent;