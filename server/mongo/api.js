var YouGouFangModel = require('./mongodb');

module.exports = {

    /**
     *  添加文档
     *
     * @param {*} data  数据 
     * @param {*} model 模型
     * @returns
     */
    createNew(data, model) {
        return new Promise((resolve, reject) => {
            YouGouFangModel[model].create(data, (err, doc) => {
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
     *  查找特定的文档(只返回一个)
     *
     * @param {*} data
     * @param {*} model
     * @returns
     */
    findOne(data, model) {
        return new Promise((resolve, reject) => {
            YouGouFangModel[model].findOne(data, (error, doc) => {
                if(error){
                    reject(error)
                }else{
                    resolve(doc)
                }
            })
        })
    },

    /**
     *  查找符合条件的文档(返回一个数组)
     *
     * @param {*} data
     * @returns
     */
    find(data, model) {
        return new Promise((resolve, reject) => {
            YouGouFangModel[model].find(data, (error, doc) => {
                if(error){
                    reject(error)
                }else{
                    resolve(doc)
                }
            })
        })
    },


    /**
     *  更新文档信息(只更新一个)
     *
     * @param {*} conditions
     * @param {*} update
     * @returns
     */
    updateOne(conditions, update, model) {
        return new Promise((resolve, reject) => {
            YouGouFangModel[model].updateOne(conditions, update, (error, doc) => {
                if(error){
                    reject(error)
                }else{
                    resolve(doc)
                }
            })
        })
    },
}