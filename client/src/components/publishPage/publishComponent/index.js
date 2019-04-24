import React, {Component} from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import {NavBar, Icon, List, InputItem, TextareaItem,
    ImagePicker, WingBlank, WhiteSpace, Picker, 
    DatePicker, Tag, Flex, Button} from 'antd-mobile'
import './index.css'
import {connect } from 'react-redux'
import OSS from 'ali-oss'

const client = new OSS({
    region: 'oss-cn-hongkong',
    accessKeyId: 'LTAIUI9gAqcczNoG',
    accessKeySecret: 'DkSLakuSxOen6IN1VVRA4QfxmGUzng',
    bucket: 'yougoufang'
})

const rentTypeInfo = [
    {title: '整租', type: 'entireRent'},
    {title: '合租', type: 'sharedRent'},
    {title: '短租', type: 'shortRent'},
    {title: '办公', type: 'officeRent'},
    {title: '车位', type: 'parkingSpaceRent'},
    {title: '其他', type: 'otherRent'},
];

const houseLayout = [
    [
        {label: '0室', value: '0室'},
        {label: '1室', value: '1室'},
        {label: '2室', value: '2室'},
        {label: '3室', value: '3室'},
        {label: '4室', value: '4室'},
        {label: '5室', value: '5室'},
    ],
    [
        {label: '0厅', value: '0厅'},
        {label: '1厅', value: '1厅'},
        {label: '2厅', value: '2厅'},
        {label: '3厅', value: '3厅'},
    ],
    [
        {label: '0卫', value: '0卫'},
        {label: '1卫', value: '1卫'},
        {label: '2卫', value: '2卫'},
        {label: '3卫', value: '3卫'},
    ]
];

const decorationDegree = [
    [
        {label: '豪华装修', value: '豪华装修'},
        {label: '精装修', value: '精装修'},
        {label: '简单装修', value: '简单装修'},
        {label: '毛坯', value: '毛坯'},
    ]
]

const now = new Date(Date.now())

const Tags = [
    {name: 'WIFI'},{name: '冰箱'},{name: '洗衣机'},
    {name: '热水器'},{name: '燃气灶'},{name: '电视机'},
    {name: '空调'},{name: '大阳台'},{name: '电梯房'}
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
            title: '',
            description: '',
            images: [],
            imageURLs: [],
            rentType: 'entireRent',
            houseLayoutValue: '',
            decorationDegreeValue: '',
            checkInTime: now,
            tagsList: []
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.onPublishClicked = this.onPublishClicked.bind(this);
        this.upLoadToOSS = this.upLoadToOSS.bind(this);
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

    onInputChange(val, type) {
        this.setState({[type]: val})
    }

    onImageChange(files, type, index) {
        this.setState({images: files});
        if(type === 'add') {
            const newImage =  this.state.images[this.state.images.length-1].file;
            const upLoadPath = newImage.lastModified + '-' + newImage.name;
            this.upLoadToOSS(upLoadPath, newImage);
        }
        else {
            const deleteImage = this.state.images[index].file;
            const deleteImagePath = deleteImage.lastModified + '-' + deleteImage.name;
            client.delete(deleteImagePath).then(res=>{
                if(res.res.status === 204) {
                    let tempURLs = this.state.imageURLs;
                    tempURLs.splice(index,1);
                    this.setState({imageURLs: tempURLs});
                }
            });
        }
    }

    upLoadToOSS(upLoadPath, file) {
        client.multipartUpload(upLoadPath, file, {
            progress: function(p){
                console.log(p)
                this.progress = p*100
            }
        }).then(res=>{
            if(res.res.status === 200) {
                let tempURLs = this.state.imageURLs;
                tempURLs.push(res.res.requestUrls[0]);
                this.setState({imageURLs: tempURLs});
            }
        });
    }

    onTagsChange(selected, name) {
        let temList = this.state.tagsList;
        if(selected) {
            temList.push(name);
        }
        else {
            let pos = temList.indexOf(name);
            temList.splice(pos, 1);
        }
        this.setState({tagsList: temList});
    }

    onPublishClicked() {
        console.log('publish clicked')
    }

    render() {
        console.log(this.state.imageURLs);
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
                            <InputItem style={{fontSize: '.12rem'}} 
                                placeholder="房屋小区或地标性建筑"
                                onChange={val=>this.onInputChange(val, 'title')}
                                />
                            {/* 这里面的placeholder实在没法换行，但是目前看来只能这样了 */}
                            <TextareaItem style={{fontSize: '.12rem'}}
                                onChange={val=>this.onInputChange(val, 'description')}
                                placeholder="详细描述会为你带来最快速的成交哦:
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
                            <List.Item 
                                arrow="horizontal"
                                extra={<InputItem
                                        placeholder="输入金额"
                                        type="number"
                                        extra={<div>
                                                    {
                                                        isSellPage? '万元':
                                                        (this.state.rentType === 'shortRent'? '/ 日':'/ 月')
                                                    }
                                                </div>}
                                        />}
                            >{isSellPage?'售价':'租金'}
                            </List.Item>
                            <Picker
                                title="选择房型"
                                cascade={false}
                                data={houseLayout}
                                value={this.state.houseLayoutValue}
                                onChange={v=>this.setState({houseLayoutValue: v})}
                            >
                                <List.Item
                                    arrow="horizontal"
                                >房型
                                </List.Item>
                            </Picker>
                            <Picker
                                cascade={false}
                                data={decorationDegree}
                                value={this.state.decorationDegreeValue}
                                onChange={v=>this.setState({decorationDegreeValue: v})}
                            >
                                <List.Item
                                    arrow="horizontal"
                                >装修程度
                                </List.Item>
                            </Picker>
                            <List.Item 
                                arrow="horizontal"
                                extra={<InputItem
                                        placeholder="输入面积"
                                        type="number"
                                        extra={<div>平米</div>}
                                        />}
                            >房屋面积
                            </List.Item>
                            <DatePicker
                                value={this.state.checkInTime}
                                onChange={v=>this.setState({checkInTime:v})}
                            >
                                <List.Item
                                    arrow="horizontal"
                                >入住时间
                                </List.Item>
                            </DatePicker>
                            <List.Item>
                                <WhiteSpace/>
                                <div className="pubish_tags_title">添加标签丰富信息,出手更快速</div>
                                <WhiteSpace/>
                                <Flex
                                    direction="row"
                                    wrap="wrap"
                                >
                                    {
                                        Tags.map(item=>(
                                            <Tag
                                                className="pubish_tags_item"
                                                key={item.name}
                                                onChange={selected=>this.onTagsChange(selected,item.name)}
                                            >
                                                {item.name}
                                            </Tag>
                                        ))
                                    }
                                </Flex>
                            </List.Item>
                        </List>
                    </div>
                </div>
                <div className="publish_button_wrapper">
                    <Button type="primary" onClick={this.onPublishClicked}>确定发布</Button>
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