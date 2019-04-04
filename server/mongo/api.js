var YouGouFangModel = require('./mongodb');
const UserModel = YouGouFangModel.UserModel;

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
    }

    // find(data={}, fields=null, options={}) {
    //     return new Promise((resolve, reject) => {
    //         //model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
    //         YouGouFangModel.find(data, fields, options, (error, doc) => {
    //             if(error){
    //                 reject(error)
    //             }else{
    //                 resolve(doc)
    //             }
    //         })
    //     })
    // },

    // findOne(data) {
    //     return new Promise((resolve, reject) => {
    //         //model.findOne(需要查找的对象,callback)
    //         YouGouFangModel.findOne(data, (error, doc) => {
    //             if(error){
    //                 reject(error)
    //             }else{
    //                 resolve(doc)
    //             }
    //         })
    //     })
    // },

    // update(conditions, update) {
    //     return new Promise((resolve, reject) => {
    //         YouGouFangModel.updateOne(conditions, update, (error, doc) => {
    //             if(error){
    //                 reject(error)
    //             }else{
    //                 resolve(doc)
    //             }
    //         })
    //     })
    // },

    // remove(conditions) {
    //     return new Promise((resolve, reject) => {
    //         //model.update(查询条件,callback)
    //         YouGouFangModel.deleteOne(conditions, (error, doc) => {
    //             if(error){
    //                 reject(error)
    //             }else{
    //                 resolve(doc)
    //             }
    //         })
    //     })
    // }
}