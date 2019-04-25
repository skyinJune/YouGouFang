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
    }
}