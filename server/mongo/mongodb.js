var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/yougoufang';

/**
 * 连接
 */
mongoose.connect(DB_URL, {useNewUrlParser:true});

mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
mongoose.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

// 房源模型
var House = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    imageURLs: {type: Array},
    rentType: {type: String},
    position: {type: Object},
    price: {type: Number},
    houseLayout: {type: Array},
    decorationDegree: {type: String},
    houseArea: {type: Number},
    checkInTime: {type: Date},
    tagsList: {type: Array},
    ownerAccount: {type: String},
    city: {type: String},
    isEntrust: {type: Boolean},
    angentCode: {type: String},
    publishTime: {type: String}
});

// 用户模型
var User = new mongoose.Schema({
    // 账号
    account: {type: String},

    // 密码
    passWord: {type: String},

    // 用户类别
    userType: {type: Number},

    // 中介编号
    agentCode: {type: String},

    // 中介是否认证通过
    isCertificationPassed: {type: Boolean, default: false},

    // 手机号
    phoneNumber: {type: Number},

    // 头像
    avatar: {type: String, default: 'http://yougoufang.oss-cn-hongkong.aliyuncs.com/YouGouFangDefultAvator.png'},

    // 邮箱
    email: {type: String, default: ''},

    // 用户简介
    introduction: {type: String, default: '你可以在这里写一段你的简介~'},

    // 关注列表
    followList: {type: Array, default: []},

    // 粉丝列表
    fansList: {type: Array, default: []},

    // 用户标签列表
    tagList: {type: Array, default: []},

    // 用户星级
    starLevel: {type: Number, default: -1},

    // 收藏房源列表
    collectionList: {type: Array, default: []},

    // 所有已发布房源列表(包括在售和已售)
    houseList: {type: Array, default: []},

    // 在售房源列表
    onSaleList: {type: Array, default: []},

    // 订单列表
    orderList: {type: Array, default: []}
})

// 整个优购房模型
var YouGouFangModel = {
    HouseModel: mongoose.model('house', House),
    UserModel: mongoose.model('user', User)
}

module.exports = YouGouFangModel;

