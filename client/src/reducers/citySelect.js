function citySelect( state = '', action) {
    switch (action.type) {
        case 'SELECTCITY' :
            return {state: action.selectedCity}
        default :
        return state
    }
}
export default citySelect;