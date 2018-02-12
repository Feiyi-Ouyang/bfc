import { combineReducers } from 'redux'
import {
    REDIRECT_TO_LOGIN,
} from './actions'

const initialState = {
    pathname: '',
}

// take a state and a action, return the next state
function register(state=initialState, action) {
    switch (action.type) {
        case REDIRECT_TO_LOGIN:
            return Object.assign({}, state, {
                pathname: '/login',
            })
        default:
            return state
    }
}

const bfcApp = combineReducers({
    register
})

export default bfcApp