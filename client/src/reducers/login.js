function login( state = { isLogin: false, user: 'sky'}, action) {
    switch (action.type) {
        case 'LOGIN' :
            return {...state, isLogin: true}
        case 'LOGOUT' :
            return {...state, isLogin: false}
        default :
        return state
    }
}
export default login;