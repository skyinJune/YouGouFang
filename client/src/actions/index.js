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

export function login() {
    return { type: 'LOGIN'}
}

export function logout() {
    return { type: 'LOGOUT'}
}