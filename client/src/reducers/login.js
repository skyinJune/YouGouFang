function login( state = { isLogin: false, user: 'sky'}, action) {
    switch (action.type) {
        case 'LOGIN' :
            return {isLogin: true, user: action.account}
        case 'LOGOUT' :
            return {...state, isLogin: false}
        default :
        return state
    }
}
export default login;