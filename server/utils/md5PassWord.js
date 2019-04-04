const utils = require('utility');

module.exports = function(passWord) {
    const salt = 'YouGouFangMzwMxZjnSY***!~&$--';
    return utils.md5(utils.md5(passWord + salt))
}