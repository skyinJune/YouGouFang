export function add() {
    return {type: 'INCREMENT'}
}

export function remove() {
    return {type: 'DECREMENT'}
}

export function addAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(add());
        }, 2000)
    }
}

export function login(account) {
    return { type: 'LOGIN', account}
}

export function logout() {
    return { type: 'LOGOUT'}
}