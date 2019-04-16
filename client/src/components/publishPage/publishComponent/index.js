import React, {Component} from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import {NavBar, Icon, List, InputItem, TextareaItem,
    ImagePicker, WingBlank, WhiteSpace, Picker} from 'antd-mobile'
import './index.css'
import {connect } from 'react-redux'

const rentTypeInfo = [
    {title: '整租', type: 'entireRent'},
    {title: '合租', type: 'sharedRent'},
    {title: '短租', type: 'shortRent'},
    {title: '办公', type: 'officeRent'},
    {title: '车位', type: 'parkingSpaceRent'},
    {title: '其他', type: 'otherRent'},
]

/**
 *  发布公用组件
 *
 * @class RentPage
 * @extends {Component}
 */
class PublishComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            rentType: 'entireRent'
        }
        this.onImageChange = this.onImageChange.bind(this);
    }

    componentDidMount() {
        new Swiper ('.swiper-container', {
            loop: false,  //循环
            autoplay: false,
            freeMode : true,
            freeModeMomentumRatio : 2,
            freeModeMomentumBounce : false,
            slidesPerView :'auto'
        })
    }

    onImageChange(files, type, index) {
        this.setState({images: files});
    }

    render() {
        const isSellPage = this.props.history.location.pathname.indexOf('sellPage') >0;
        return (
            <div>
                <div className="common_navbar_wrapper">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        rightContent={[
                            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                            <Icon key="1" type="ellipsis" />,
                          ]}
                        onLeftClick={()=> this.props.history.goBack()}
                    >
                        {isSellPage? "发布售房" : "发布租房"}
                    </NavBar>
                </div>
                <div className="main_wrapper">
                    <div className="common_basicInfoInput input_size">
                        <List>
                            <InputItem style={{fontSize: '.12rem'}} placeholder="房屋小区或地标性建筑"/>
                            {/* 这里面的placeholder实在没法换行，但是目前看来只能这样了 */}
                            <TextareaItem style={{fontSize: '.12rem'}} placeholder="详细描述会为你带来最快速的成交哦:
                                1.描述下你房源的优势，如距离地铁近2.描述下房源内部结构，如老小区、新装修
                                3.描述下你希望什么样的房客，如爱护房子的小两口
                                "
                                rows={4}
                            />
                        </List>
                    </div>
                    <div className="common_imagePicker_wrapper">
                        <WingBlank>
                            <WhiteSpace/>
                            <div className="common_imagePicker_title">选择照片上传，第一张是主图哦</div>
                            <WhiteSpace/>
                            <ImagePicker
                                files={this.state.images}
                                onChange={this.onImageChange}
                            />
                            <WhiteSpace size="sm"/>
                        </WingBlank>
                    </div>
                    <div className="common_pickerList">
                        <WhiteSpace/>
                        {isSellPage? null
                            :<div className="common_pickerList_rentType_swiper">
                                <div className="swiper-container">
                                        <div className="swiper-wrapper">
                                            {
                                                rentTypeInfo.map((item)=>(
                                                    <div className={"swiper-slide " + 
                                                        (this.state.rentType === item.type? "swiper-slide-selected"
                                                        : "swiper-slide-Unselected")}
                                                        key={item.type}
                                                        onClick={()=>this.setState({rentType: item.type})}                                              >
                                                    {item.title}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                </div>
                            </div>
                        }
                        <List>
                            <List.Item 
                                extra={<div>
                                        {Object.keys(this.props.selectedCommunity).length === 0 
                                            ? '请输入小区名称' : this.props.selectedCommunity.state.title}
                                        </div>}
                                arrow="horizontal"
                                onClick={()=>this.props.history.push('/publishPage/communitySelect')}
                            >位置</List.Item>
                            <Picker
                                onOk={e => console.log('ok', e)}
                                onDismiss={e => console.log('dismiss', e)}
                            >
                            <List.Item arrow="horizontal">租金</List.Item>
                            </Picker>
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

// 引入store中的state
const mapStateToProps = (state) => {
    return {selectedCommunity: state.communitySelect}
}

// 把action和store一起通过props绑定到这个组件上
PublishComponent = connect(mapStateToProps)(PublishComponent);

export default PublishComponent;