function communitySelect( state = {}, action) {
    switch (action.type) {
        case 'SELECTCOMMUNITY' :
            return {state: action.selectedCommunity}
        default :
        return state
    }
}
export default communitySelect;