function listAssign (arrA, arrB) {
    Object.keys(arrA).forEach(key => { arrA[key] = arrB[key] || arrA[key]});
} 

function throttle(fn, wait = 500, period = 1000) {
    let startTime = new Date().getTime();
    let timeout;
    return (...args) => {
        return new Promise(resolve => {
            const now = new Date().getTime();
            if (now - startTime >= period) {
                startTime = now;
                resolve(fn.apply(null, args));
            } else {
                timeout && clearTimeout(timeout);
                timeout = setTimeout(() => {
                    resolve(fn.apply(null, args));
                }, wait);
            }
        }); 
    }
}

export {
    listAssign,
    throttle
}