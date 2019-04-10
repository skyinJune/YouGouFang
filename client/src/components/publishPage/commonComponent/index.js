import React, {Component} from 'react';
import {NavBar, Icon, List, InputItem, TextareaItem} from 'antd-mobile';
import './index.css'

/**
 *  发布公用组件
 *
 * @class RentPage
 * @extends {Component}
 */
class Common extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
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
                        onLeftClick={()=> this.props.goBack()}
                    >
                        {this.props.pageType}
                    </NavBar>
                </div>
                <div className="children_wrapper">
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
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default Common;