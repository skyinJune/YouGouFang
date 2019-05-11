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

	// md5加密用户输入的密码
	const inputPassWord = YouGouFangMd5(UserInfo.passWord);
	api.findOne(searchAccount, 'UserModel').then(result =>{
		if(result) {
			const passWord = result.passWord;
			// 判断用户输入的加密结果和数据库存入的加密结果是否一致
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

		// 一定要先搞一个空的数组，把获取到的数组赋值过来，不然push不了
		var houseList = [];
		
		// 获取用户数据
		api.findOne(condition, 'UserModel').then(result=>{
			// 赋值到空数组上
			houseList = result.houseList;
		}).then(()=>{
			houseList.push(result._id);
			var update = {
				$set: { 'houseList': houseList}
			};
			// 更新
			api.updateOne(condition, update, 'UserModel').then(result=>console.log(result));
			res.json(result);}
		)
  	}
	)
})

// 获取房屋信息
router.post('/getHouseInfo', function(req, res, next) {
	const HouseInfo = req.body;
	// 通过_id查找的时候必须用ObjectId，不能用字符串直接查
	const _id = new mongoose.Types.ObjectId(HouseInfo._id);
	const searchHouse = {_id: _id};
	api.findOne(searchHouse, 'HouseModel').then(result => {
		res.json(result);

		// 如果请求体里带有browsed(表示是浏览)就要给浏览次数+1
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

	// 要收藏(取消收藏)的房源的_id
	const _id = new mongoose.Types.ObjectId(collectInfo._id);
	var condition = {'account': collectInfo.account};
	let collectionList = [];
	// 获取用户数据
	api.findOne(condition, 'UserModel').then(result=>{
		collectionList = result.collectionList;
		// 判断是收藏还是取消收藏
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
		// 更新
		api.updateOne(condition, update, 'UserModel').then(result=>console.log(result));
	}).then(()=>(
		// 房源的收藏数更改
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
			// 更新
			api.updateOne({_id: _id}, update, 'HouseModel').then(result=>res.json(result));
		})
	))
})

// 预约看房
router.post('/bookingHouse', function(req, res, next) {
	const newOrder = req.body;
	// 创建新的的预约订单
	api.createNew(newOrder, 'OrderModel').then(result =>{
		res.json(result);

		// 买家orderList更新
		api.findOne({account: result.buyerAccount}, 'UserModel').then(buyerData=>{
			let orderList = [];
			orderList = buyerData.orderList;
			orderList.push({order_id: result._id, type: 'buyer'});
			let buyerUpdate = {
				$set: { 'orderList': orderList}
			}
			api.updateOne({account: result.buyerAccount}, buyerUpdate, 'UserModel');
		})

		// 卖家orderList更新
		api.findOne({_id: new mongoose.Types.ObjectId(result.house_id)}, 'HouseModel').then(
			houseInfo=>{
				api.findOne({account: houseInfo.ownerAccount}, 'UserModel').then(ownerDate=>{
					let orderList = [];
					orderList = ownerDate.orderList;
					orderList.push({order_id: result._id, type: 'owner'});
					let ownerUpdate = {
						$set: { 'orderList': orderList}
					}
					api.updateOne({account: houseInfo.ownerAccount}, ownerUpdate, 'UserModel');
				})
			}
		)
	})
})

// 获取订单信息
router.post('/getOrderInfo', function(req, res, next) {
	const OrderInfo = req.body;
	// 通过_id查找的时候必须用ObjectId，不能用字符串直接查
	const _id = new mongoose.Types.ObjectId(OrderInfo._id);
	const searchOrder = {_id: _id};
	api.findOne(searchOrder, 'OrderModel').then(result => {
		res.json(result);
	})
})

// 更改订单状态
router.post('/changeOrderInfo', function(req, res, next) {
	const orderInfo = req.body;
	let orderUpdate = {
		$set: { 'status': orderInfo.status}
	}
	api.updateOne({_id: new mongoose.Types.ObjectId(orderInfo._id)}, orderUpdate, 'OrderModel').then(result=>res.json(result));
})

// 更改订单列表
router.post('/changeOrderList', function(req, res, next) {
	const orderListInfo = req.body;
	let orderListUpdate = {
		$set: { 'orderList': orderListInfo.orderList}
	}
	api.updateOne({account: orderListInfo.account}, orderListUpdate, 'UserModel').then(result=>res.json(result));
})

module.exports = router;
