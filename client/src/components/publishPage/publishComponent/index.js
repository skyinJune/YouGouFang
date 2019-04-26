import React, {Component} from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import {NavBar, Icon, List, InputItem, TextareaItem,
    ImagePicker, WingBlank, WhiteSpace, Picker, 
    DatePicker, Tag, Flex, Button, Toast} from 'antd-mobile'
import './index.css'
import {connect } from 'react-redux'
import OSS from 'ali-oss'
import 'whatwg-fetch'

// 阿里云oss对象初始化，先在前端做吧，后续如果有时间改到服务端去做签名再上传，安全一些
const client = new OSS({
    region: 'oss-cn-hongkong',
    accessKeyId: 'LTAIUI9gAqcczNoG',
    accessKeySecret: 'DkSLakuSxOen6IN1VVRA4QfxmGUzng',
    bucket: 'yougoufang'
})

// 出租类别数组
const rentTypeInfo = [
    {title: '整租', type: 'entireRent'},
    {title: '合租', type: 'sharedRent'},
    {title: '短租', type: 'shortRent'},
    {title: '办公', type: 'officeRent'},
    {title: '车位', type: 'parkingSpaceRent'},
    {title: '其他', type: 'otherRent'},
];

// 房型数组
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

// 装修程度数组
const decorationDegree = [
    [
        {label: '豪华装修', value: '豪华装修'},
        {label: '精装修', value: '精装修'},
        {label: '简单装修', value: '简单装修'},
        {label: '毛坯', value: '毛坯'},
    ]
]

// 取得现在的时间
const now = new Date(Date.now())

// 标签数组
const Tags = [
    {name: 'WIFI'},{name: '冰箱'},{name: '洗衣机'},
    {name: '热水器'},{name: '燃气灶'},{name: '电视机'},
    {name: '空调'},{name: '大阳台'},{name: '电梯房'},
    {name: '暖气'}
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
            price: 0,
            rentType: 'entireRent',
            houseLayoutValue: [],
            decorationDegreeValue: '',
            houseArea: 0,
            checkInTime: now,
            tagsList: [],
            isEntrust: false,
            angentCode: '',
            isSubmit: false
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.onPublishClicked = this.onPublishClicked.bind(this);
        this.upLoadToOSS = this.upLoadToOSS.bind(this);
        this.checkBeforePublish = this.checkBeforePublish.bind(this);
        this.submitPublishInfo = this.submitPublishInfo.bind(this);
    }

    componentDidMount() {
        // 首先判断一下是否登录了，没登陆就跳到登录页面
        if(!this.props.allState.login.isLogin) {
            this.props.history.push('/login');
            Toast.fail('登录后才可使用发布功能哦',2);
        }

        // 初始化swiper
        new Swiper ('.swiper-container', {
            loop: false,  //循环
            autoplay: false,
            freeMode : true,
            freeModeMomentumRatio : 2,
            freeModeMomentumBounce : false,
            slidesPerView :'auto'
        })
    }

    componentWillUnmount() {
        // 当组件卸载(任何离开本页面的情况下)都判断一下是否是已发布，没发布就把上传的图片删除
        if(!this.state.isSubmit) {
            this.state.images.forEach(item=>{
                const deleteItemPath = item.file.lastModified + '-' + item.file.name;
                client.delete(deleteItemPath);
            })
        }
    }

    /**
     *  各种输入框输入变化处理函数
     *
     * @param {*} val 输入框中的值
     * @param {*} type 要set的state
     * @memberof PublishComponent
     */
    onInputChange(val, type) {
        this.setState({[type]: val})
    }

    /**
     *  图片选择器变化后(添加或删除图片)后的处理函数
     *
     * @param {*} files 这是所有已添加的图片的对象的数组(没错它是数组)
     * @param {*} type 是添加操作(add)还是删除操作(remove)
     * @param {*} index 当删除时返回被删除的图片的index(原files中的索引值)
     * @memberof PublishComponent
     */
    onImageChange(files, type, index) {
        // 一旦发生变化,直接setState
        this.setState({images: files});

        // 如果是add操作
        if(type === 'add') {
            // 取得新添加的图片的对象(添加总是添加到files数组的最后一个)
            const newImage =  this.state.images[this.state.images.length-1].file;

            // 拼接上传文件的名称(确保唯一性)
            const upLoadPath = newImage.lastModified + '-' + newImage.name;

            // 上传到oss
            this.upLoadToOSS(upLoadPath, newImage);
        }
        // 如果是remove操作
        else {
            // 取得被删除的图片的对象(这里files数组已经取不到被删除的元素了，只能去state中取了，setState是异步的所以没有立即被删除,所以还可以去到被删除的对象)
            const deleteImage = this.state.images[index].file;

            // 按照上传时命名的方式重新拼接一遍
            const deleteImagePath = deleteImage.lastModified + '-' + deleteImage.name;

            // 从oss中删除
            client.delete(deleteImagePath).then(res=>{
                if(res.res.status === 204) {
                    // 取得imageURLs数组
                    let tempURLs = this.state.imageURLs;

                    // 把删除掉的图片的url移除
                    tempURLs.splice(index, 1);

                    // 重新setState
                    this.setState({imageURLs: tempURLs});
                }
            });
        }
    }

    /**
     *  上传到oss的函数
     *
     * @param {*} upLoadPath 上传的图片的名称(拼接好再传进来)
     * @param {*} file 上传的图片的file对象
     * @memberof PublishComponent
     */
    upLoadToOSS(upLoadPath, file) {
        // 这里用了简单上传put方法，没有用分片上传的multipartUpload(这个不返回上传之后的url，得自己拼接，自己拼的有的时候打不开。。。),
        client.put(upLoadPath, file).then(res=>{
            if(res.res.status === 200) {
                // 把返回的url存进imageURLs数组
                let tempURLs = this.state.imageURLs;
                tempURLs.push(res.url);
                this.setState({imageURLs: tempURLs});
            }
        });
    }

    /**
     *  底部taglist中每个item变化(被选中或取消)的处理函数
     *
     * @param {*} selected
     * @param {*} name
     * @memberof PublishComponent
     */
    onTagsChange(selected, name) {
        // 获取已选中的tagsList
        let temList = this.state.tagsList;

        // 如果是选中操作
        if(selected) {
            // 存入
            temList.push(name);
        }
        // 如果是取消操作
        else {
            // 找到这个item在tagsList中的位置并移除
            let pos = temList.indexOf(name);
            temList.splice(pos, 1);
        }
        // 最后重新setState一下
        this.setState({tagsList: temList});
    }

    /**
     *  发布前检查一下所需的数据是否都已填,没填就提示用户(出现多个没填的信息时只提醒一个,没有顺序)
     *
     * @returns
     * @memberof PublishComponent
     */
    checkBeforePublish() {
        let titleCheck, descriptionCheck,
        imageURLsCheck, positionCheck,
        priceCheck, houseLayoutValueCheck,
        decorationDegreeValueCheck,
        houseAreaCheck;
        if(!this.state.title) {
            Toast.fail('没有输入标题哦，输入后再提交~',2);
        }
        else {
            titleCheck = true;
        }
        if(!this.state.description) {
            Toast.fail('没有输入描述哦，输入后再提交~',2);
        }
        else {
            descriptionCheck = true;
        }
        if(!this.state.imageURLs.length) {
            Toast.fail('没有上传图片或上传失败哦，重试再提交~',2);
        }
        else {
            imageURLsCheck = true;
        }
        if(Object.keys(this.props.allState.communitySelect).length === 0) {
            Toast.fail('没有选择小区哦，选择后再提交~',2);
        }
        else {
            positionCheck = true;
        }
        if(!this.state.price) {
            Toast.fail('没有输入金额哦，输入后再提交~',2);
        }
        else {
            priceCheck = true;
        }
        if(!this.state.houseLayoutValue) {
            Toast.fail('没有选择房型哦，选择后再提交~',2);
        }
        else {
            houseLayoutValueCheck = true;
        }
        if(!this.state.decorationDegreeValue) {
            Toast.fail('没有选择装修程度哦，选择后再提交~',2);
        }
        else {
            decorationDegreeValueCheck = true;
        }
        if(!this.state.houseArea) {
            Toast.fail('没有输入房屋面积哦，输入后再提交~',2);
        }
        else {
            houseAreaCheck = true;
        }
        return titleCheck && descriptionCheck && imageURLsCheck
        && positionCheck && priceCheck && houseLayoutValueCheck
        && decorationDegreeValueCheck && houseAreaCheck
    }

    /**
     *  存入数据库
     *
     * @memberof PublishComponent
     */
    submitPublishInfo() {
        let publishTime = new Date(Date.now());
        let saleType = (this.props.history.location.pathname.indexOf('sellPage') >0)? 'sale':'rent';
        const publishInfo = {
            title: this.state.title,
            description: this.state.description,
            imageURLs: this.state.imageURLs,
            saleType: saleType,
            rentType: this.state.rentType,
            position: this.props.allState.communitySelect.state,
            price: this.state.price,
            houseLayout: this.state.houseLayoutValue,
            decorationDegree: this.state.decorationDegreeValue[0],
            houseArea: this.state.houseArea,
            checkInTime: this.state.checkInTime,
            tagsList: this.state.tagsList,
            ownerAccount: this.props.allState.login.user,
            city: this.props.allState.citySelect.state,
            status: 'onsale',
            isEntrust: this.state.isEntrust,
            angentCode: this.state.angentCode,
            publishTime: publishTime
        };
        const data = JSON.stringify(publishInfo);

        Toast.loading('正在发布...');

        fetch('/publishhouse', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
          }).then(response => response.json())
          .then(data => {
            Toast.hide();
            console.log('发布成功！',data);
            this.props.history.push('/publishPage/publishSuccess');
          });
    }

    /**
     *  底部button点击后的处理函数
     *
     * @memberof PublishComponent
     */
    onPublishClicked() {
        if(this.checkBeforePublish()) {
            this.setState({isSubmit: true});
            this.submitPublishInfo();
        }
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
                                        {Object.keys(this.props.allState.communitySelect).length === 0 
                                            ? '请输入小区名称' : this.props.allState.communitySelect.state.title}
                                        </div>}
                                arrow="horizontal"
                                onClick={()=>this.props.history.push('/publishPage/communitySelect')}
                            >位置</List.Item>
                            <List.Item 
                                arrow="horizontal"
                                extra={<InputItem
                                        placeholder="输入金额"
                                        type="number"
                                        onChange={(val)=>this.setState({price: val})}
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
                                        onChange={val=>this.setState({houseArea: val})}
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
    return {
        allState: state
    }
}

// 把action和store一起通过props绑定到这个组件上
PublishComponent = connect(mapStateToProps)(PublishComponent);

export default PublishComponent;