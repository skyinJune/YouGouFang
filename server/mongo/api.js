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
     *  账号密码登录
     *
     * @param {*} data
     * @returns
     */
    loginByAccount(data) {
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

    findUser(data) {
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
}