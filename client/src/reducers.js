import { combineReducers } from 'redux'
import {
    ADD_PRODUCT,
    RM_PRODUCT, 
} from './actions'

// take a state and a action, return the next state
function products(state=[], action) {
    switch (action.type) {
        // TODO: now suppose products only had id 
        case ADD_PRODUCT:
            return [
                ...state,
                {
                    id: action.id,
                }
            ]
        case RM_PRODUCT: 
            const productId = action.id;
            return state.filter(product => product.id !== productId);
        default:
            return state
    }
}

const bfcApp = combineReducers({
    products
})
export default bfcApp