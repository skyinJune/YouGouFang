var YouGouFangModel = require('./mongodb');
const UserModel = YouGouFangModel.UserModel;
const HouseModel = YouGouFangModel.HouseModel;

module.exports = {
    /**
     *  注册新账户方法
     *
     * @param {*} data 用户信息对象
     * @returns
     */
    createNewAccount(data) {
        return new Promise((resolve, reject) => {
            UserModel.create(data, (err, doc) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(doc)
                }
            })
        })
    },

    /**
     *  获取账号信息
     *
     * @param {*} data
     * @returns
     */
    getUserInfo(data) {
        return new Promise((resolve, reject) => {
            UserModel.findOne(data, (error, doc) => {
                if(error){
                    reject(error)
                }else{
                    resolve(doc)
                }
            })
        })
    },

    /**
     *  更新用户信息
     *
     * @param {*} conditions
     * @param {*} update
     * @returns
     */
    userUpdate(conditions, update) {
        return new Promise((resolve, reject) => {
            UserModel.updateOne(conditions, update, (error, doc) => {
                if(error){
                    reject(error)
                }else{
                    resolve(doc)
                }
            })
        })
    },

    /**
     *  发布新房源
     *
     * @param {*} data
     * @returns
     */
    createNewHouse(data) {
        return new Promise((resolve, reject) => {
            HouseModel.create(data, (err, doc) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(doc)
                }
            })
        })
    },

    /**
     *  查找单个特定房源
     *
     * @param {*} data
     * @returns
     */
    getHouseInfo(data) {
        return new Promise((resolve, reject) => {
            HouseModel.findOne(data, (error, doc) => {
                if(error){
                    reject(error)
                }else{
                    resolve(doc)
                }
            })
        })
    },

    /**
     *  搜索符合条件的房源
     *
     * @param {*} data
     * @returns
     */
    searchHouse(data) {
        return new Promise((resolve, reject) => {
            HouseModel.find(data, (error, doc) => {
                if(error){
                    reject(error)
                }else{
                    resolve(doc)
                }
            })
        })
    }
}