function listAssign (arrA, arrB) {
    Object.keys(arrA).forEach(key => { arrA[key] = arrB[key] || arrA[key]});
} 

function throttle(fn, interval) {
    var _self = fn,  //保存需要被延迟执行的函数引用
        timer,  //定时器
        firstTime = true;  //是否第一次调用
    return function() { //返回一个函数，形成闭包，持久化变量
        var args = arguments, //缓存变量
            _me = this;
        if(firstTime) { //如果是第一次调用，不用延迟执行
        _self.apply(_me, args);
        return firstTime = false;
        }
        if(timer) { //如果定时器还在，说明上一次延迟执行还没有完成
        return false;
        }
        timer = setTimeout(function() { //延迟一段时间执行
        clearTimeout(timer);
        timer = null;
        _self.apply(_me, args);
        }, interval || 500);
    };
}

/**
 *  获取url search中的参数
 *
 * @returns
 */
function getUrlParams() {
    let searchStr = window.location.search;
    let paramObj = {};
    searchStr = searchStr.substring(searchStr.indexOf('?')+1);
    let searchStrArr = searchStr.split('&');
    searchStrArr.forEach(item=>(
        paramObj[item.split('=')[0]] = item.split('=')[1]
    ));
    return paramObj
}

export {
    listAssign,
    throttle,
    getUrlParams
}