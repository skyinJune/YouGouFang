export function listAssign (arrA, arrB) {
    Object.keys(arrA).forEach(key => { arrA[key] = arrB[key] || arrA[key]});
} 