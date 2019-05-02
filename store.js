import { createStore, combineReducers, applyMiddleware } from 'redux'
import edimaxReducer from './reducers/edimax'
import productReducer from './reducers/product'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    edimaxReducer,
    productReducer
})
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
export default store;