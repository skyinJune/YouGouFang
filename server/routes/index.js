var express = require('express');
var router = express.Router();
var api = require('../mongo/api');
const YouGouFangMd5 = require('../utils/md5PassWord');

// 通过账号注册
router.post('/registerbyaccount', function(req, res, next) {
  const newUser = req.body;
  api.createNewAccount({...newUser, passWord: YouGouFangMd5(newUser.passWord)}).then(result =>{
    res.json(result);
  })
})

// 账号登录
router.post('/loginbyaccount', function(req, res, next) {
  const UserInfo = req.body;
  const searchAccount = {'account': UserInfo.account};
  const inputPassWord = YouGouFangMd5(UserInfo.passWord);
  api.loginByAccount(searchAccount).then(result =>{
    if(result) {
      const passWord = result.passWord;
      passWord === inputPassWord ? res.json({...searchAccount, 'checkStatus': 'OK'})
        : res.json({...searchAccount, 'checkStatus': 'Fail'})
    }
    else {
      res.json({...searchAccount, 'accountStatus': 'NotExist'})
    }
  })
})

// 获取用户信息
router.post('/getUserInfo', function(req, res, next) {
  const UserInfo = req.body;
  const searchAccount = {'account': UserInfo.account};
  api.loginByAccount(searchAccount).then(result => res.json(result));
})

// 发布房源
router.post('/publishhouse', function(req, res, next) {
  const newHouse = req.body;
  api.createNewHouse(newHouse).then(result =>{
    // 发布成功之后把房源_id添加到用户的houseList里面
    var condition = {'account': result.ownerAccount};
    var houseList = [];
    api.findUser(condition).then(result=>{
      houseList = result.houseList;
    })
    houseList.push(result._id);
    var update = {
      $set: { 'houseList': houseList}
    };
    api.userUpdate(condition, update).then(result=>console.log(result));
    res.json(result);
  })
})

module.exports = router;
