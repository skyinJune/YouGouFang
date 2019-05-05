import React, {Component} from 'react'
import './index.css'
import {List} from 'antd-mobile'

// tags列表
const TagsIconList = [
    {name: 'WIFI', icon: 'icon-WIFI'}, {name: '冰箱', icon: 'icon-bingxiang'}, {name: '洗衣机', icon: 'icon-xiyiji'},
    {name: '热水器', icon: 'icon-reshuiqi'}, {name: '燃气灶', icon: 'icon-huo'}, {name: '电视机', icon: 'icon-dianshi'},
    {name: '空调', icon: 'icon-kongtiao'}, {name: '阳台', icon: 'icon-hekriconqingjingyangtai'}, {name: '暖气', icon: 'icon-shuinuanqigongcheng'},
    {name: '微波炉', icon: 'icon-weibolu'}, {name: '衣柜', icon: 'icon-yigui'}, {name: '电梯房', icon: 'icon-dianti'}
]

/**
 *  housPage描述+tags部分
 *
 * @class Description
 * @extends {Component}
 */
class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.checkTags = this.checkTags.bind(this);
    }

    /**
     *  检查是房源的tagList中是否包含某个tag
     *
     * @param {*} name
     * @returns
     * @memberof Description
     */
    checkTags(name) {
        if(this.props.houseInfo.tagsList.indexOf(name) >= 0) {
            return 'housePage_description_tagItem_include'
        }
        else {
            return 'housePage_description_tagItem_exclude'
        }
    }

    render() {
        return (
            <div className="housePage_description_wrapper">
                {
                    Object.keys(this.props.houseInfo).length?
                    <List>
                        <List.Item>
                            <div className="housePage_description_title_wrapper">
                                <div className="housePage_description_title">描述</div>
                                <div className="housePage_description_titleExtra">浏览{this.props.houseInfo.browsedCount}</div>
                                <div className="housePage_description_titleExtra">收藏{this.props.houseInfo.collectedCount}</div>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className="housePage_description_content">{this.props.houseInfo.description}</div>
                        </List.Item>
                        <List.Item>
                            <div className="housePage_description_tagList_wrapper">
                                {
                                    TagsIconList.map(item=>(
                                        <div className="housePage_description_tagItem_wrapper" key={item.name}>
                                            <div className="housePage_description_tagItem_IconWrapper">
                                                <i className={'iconfont housePage_description_tagItem_Icon ' + this.checkTags(item.name) + ' ' + item.icon}/>
                                            </div>
                                            <div className={"housePage_description_tagItem_name " + this.checkTags(item.name)}>{item.name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </List.Item>
                    </List>
                    :null
                }
            </div>
        )
    }
}

export default Description