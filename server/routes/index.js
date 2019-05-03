var express = require('express');
var router = express.Router();
var api = require('../mongo/api');
const YouGouFangMd5 = require('../utils/md5PassWord');
var mongoose = require('mongoose');

// 通过账号注册
router.post('/registerbyaccount', function(req, res, next) {
	const newUser = req.body;
	api.createNew({...newUser, passWord: YouGouFangMd5(newUser.passWord)}, 'UserModel').then(result =>{
	res.json(result);
	})
})

// 账号登录
router.post('/loginbyaccount', function(req, res, next) {
	const UserInfo = req.body;
	const searchAccount = {'account': UserInfo.account};
	const inputPassWord = YouGouFangMd5(UserInfo.passWord);
	api.findOne(searchAccount, 'UserModel').then(result =>{
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
	api.findOne(searchAccount, 'UserModel').then(result => res.json(result));
})

// 发布房源
router.post('/publishhouse', function(req, res, next) {
	const newHouse = req.body;
	api.createNew(newHouse, 'HouseModel').then(result =>{
		// 发布成功之后把房源_id添加到用户的houseList里面
		var condition = {'account': result.ownerAccount};
    	var houseList = [];
		api.findOne(condition, 'UserModel').then(result=>{
			houseList = result.houseList;
		}).then(()=>{
			houseList.push(result._id);
			var update = {
				$set: { 'houseList': houseList}
			};
			api.updateOne(condition, update, 'UserModel').then(result=>console.log(result));
			res.json(result);}
		)
  	}
	)
})

// 获取房屋信息
router.post('/getHouseInfo', function(req, res, next) {
	const HouseInfo = req.body;
	const _id = new mongoose.Types.ObjectId(HouseInfo._id);
	const searchHouse = {_id: _id};
	api.findOne(searchHouse, 'HouseModel').then(result => {
		res.json(result);
		if(HouseInfo.browsed) {
			let browsedCount = result.browsedCount +1;
			let update = {
				$set: { 'browsedCount': browsedCount}
			};
			api.updateOne(searchHouse, update, 'HouseModel').then(result=>console.log(result));
		}
  	})
    
})

// 搜索房源
router.post('/searchHouse', function(req, res, next) {
	const searchCondition = req.body;
	api.find(searchCondition, 'HouseModel').then(result => 
    res.json(result))
})

// 收藏(取消收藏)房源
router.post('/collectHouse', function(req, res, next) {
	const collectInfo = req.body;
	const _id = new mongoose.Types.ObjectId(collectInfo._id);
	var condition = {'account': collectInfo.account};
	let collectionList = [];
	api.findOne(condition, 'UserModel').then(result=>{
		collectionList = result.collectionList;
		if(collectInfo.isCollected) {
			collectionList.push(_id)
		}
		else {
			collectionList.splice(collectionList.indexOf(collectInfo._id), 1);
		}
  	}).then(()=>{
		let update = {
		$set: { 'collectionList': collectionList}
		};
		api.updateOne(condition, update, 'UserModel').then(result=>console.log(result));
	}).then(()=>(
		api.findOne({_id: _id}, 'HouseModel').then(result=>{
			let collectedCount = result.collectedCount;
			if(collectInfo.isCollected) {
				collectedCount ++;
			}
			else {
				collectedCount --;
			}
			let update = {
				$set: { 'collectedCount': collectedCount}
			}
			api.updateOne({_id: _id}, update, 'HouseModel').then(result=>res.json(result));
		})
	))
})

// 预约看房
router.post('/bookingHouse', function(req, res, next) {
	const newOrder = req.body;
	api.createNew(newOrder, 'OrderModel').then(result =>{
		res.json(result);
	})
})

module.exports = router;
