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

var YouGouFangSchema = new mongoose.Schema({
    title: {type: String},
    pictures: {type: Array},
    type: {type: Array},
    infomations: {type: Array},
    description: {type: String}
});

var YouGouFangModel = mongoose.model('yougoufang', YouGouFangSchema);

module.exports = YouGouFangModel;