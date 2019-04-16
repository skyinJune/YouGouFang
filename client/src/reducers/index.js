import { combineReducers} from 'redux'
import login from './login'
import citySelect from './citySelect'
import communitySelect from './communitySelect'
 
export default combineReducers({
    login,
    citySelect,
    communitySelect
})