var express = require('express');
var router = express.Router();
var api = require('../mongo/api');

// 通过账号注册
router.post('/registerbyaccount', function(req, res, next) {
  const newUser = req.body;
  api.createNewAccount(newUser).then(result =>{
    res.json(result);
  })
})

// 账号登录
router.post('/loginbyaccount', function(req, res, next) {
  const UserInfo = req.body;
  const searchAccount = {'account': UserInfo.account};
  const inputPassWord = UserInfo.passWord;
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

module.exports = router;
