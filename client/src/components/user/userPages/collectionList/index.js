import React, {Component} from 'react'
import { connect } from 'react-redux'
import CommenHeader from '../../../commonComponents/commonHeader'
import HouseCard from '../../../commonComponents/houseCard'

/**
 *  我的收藏组件
 *
 * @class CollectionList
 * @extends {Component}
 */
class CollectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houseList: [],
            isLoading: true
        };
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.fetchHouseList = this.fetchHouseList.bind(this);
    }

    componentDidMount() {
        if(this.props.logInfo.isLogin) {
            this.fetchUserInfo();
        }
        else {
            this.props.history.push('/login');
        }
    }

    /**
     *  发送请求的函数
     *
     * @memberof UserCenterIndex
     */
    fetchUserInfo() {

        const userInfo = {
            account: this.props.logInfo.user
        };

        // 转换为Json字符串
        const data = JSON.stringify(userInfo);

        fetch('/getUserInfo', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:data
        }).then(response => response.json())
        .then(data=>{
            let collectionList = data.collectionList;
            if(collectionList.length) {
                this.fetchHouseList(collectionList);
            }
            else {
                this.setState({isLoading: false})
            }
            
        })
    }

    fetchHouseList(houseList) {
        let tempList = [];
        houseList.forEach(item=>{
            const houseInfo = {
                _id: item
            };
            const data = JSON.stringify(houseInfo);
            fetch('/getHouseInfo', {
                method:'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body:data
            }).then(response => response.json())
            .then(data=>{
                tempList.push(data);
                if(tempList.length === houseList.length) {
                    tempList.sort((a, b)=>(
                        new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
                        ));
                    this.setState({houseList: tempList, isLoading: false});
                }
            })
        })
    }

    render() {
        return (
            <div>
                <CommenHeader history={this.props.history} title="我的收藏"/>
                <div style={{marginTop: '.35rem'}}>
                    {
                        this.state.isLoading? 
                        <div className="recommend_loading_wrapper">
                            <div className="recommend_loading_img_wrapper">
                                <img className="recommend_loading_img" 
                                    src="https://yougoufang.oss-cn-hongkong.aliyuncs.com/homePage_recommend_loading/loading.gif"
                                    alt=""
                                />
                            </div>
                        </div>
                        :this.state.houseList.length === 0? 
                            <div className="houselist_empty_wrapper">
                                <div className="houselist_empty_icon_wrapper"><i className="iconfont icon-emizhifeiji houselist_empty_icon"/></div>
                                <div className="houselist_empty_words">你还没有收藏房源哦，快去看看吧~</div>
                            </div>
                        :(this.state.houseList.map(item=>(
                            <HouseCard houseInfo={item} key={item._id} history={this.props.history}/>
                        )))
                        
                    }
                </div>
            </div>
        )
    }
}

// 从redux中取出登录信息
const mapStateToProps = (state) => {
    return {
        logInfo: state.login
    }
  }

//   将登录信息以props的形式传入
CollectionList = connect(mapStateToProps)(CollectionList);

export default CollectionList;