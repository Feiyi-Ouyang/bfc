import { combineReducers } from 'redux'
import {
    ADD_PRODUCT,
    RM_PRODUCT, 
    RM_ALL_PRODUCT,
} from './actions'

// take a state and a action, return the next state
function products(state=[], action) {
    switch (action.type) {
        // TODO: now suppose products only had id 
        case ADD_PRODUCT:
            var newState = []
            var updated = false
            for (var i = 0; i < state.length; ++i) {
                if (state[i].id===action.id) {
                   newState[i] = {id: state[i].id, number: state[i].number+1} 
                   updated = true
                } else {
                    newState[i] = state[i]
                }
            }
            if (updated === false) {
                newState.push({id: action.id, number: 1})
            }
            return newState
        case RM_PRODUCT: 
            const productId = action.id;
            return state.filter(product => product.id !== productId);
        case RM_ALL_PRODUCT: 
            return []
        default:
            return state
    }
}

const bfcApp = combineReducers({
    products
})
export default bfcApp