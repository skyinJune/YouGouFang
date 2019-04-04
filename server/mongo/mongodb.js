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
    pictures: {type: Array},
    type: {type: Array},
    infomations: {type: Array},
    description: {type: String}
});

// 用户模型
var User = new mongoose.Schema({
    // 账号
    account: {type: String},

    // 密码
    passWord: {type: String},

    // 用户类别
    userType: {type: Number},

    // 手机号
    phoneNumber: {type: Number},

    // 头像
    avatar: {type: String},

    // 邮箱
    email: {type: String},

    // 用户简介
    introduction: {type: String},

    // 用户标签列表
    tagList: {type: Array},

    // 用户星级
    starLevel: {type: Number},

    // 关注房源列表
    followList: {type: Array},

    // 所有已发布房源列表(包括在售和已售)
    houseList: {type: Array},

    // 在售房源列表
    onSaleList: {type: Array},

    // 订单列表
    orderList: {type: Object}
})

// 整个优购房模型
var YouGouFangModel = {
    HouseModel: mongoose.model('house', House),
    UserModel: mongoose.model('user', User)
}

module.exports = YouGouFangModel;

