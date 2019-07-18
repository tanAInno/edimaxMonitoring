import { createStore, combineReducers, applyMiddleware } from 'redux'
import edimaxReducer from './reducers/edimax'
import productReducer from './reducers/product'
import serviceReducer from './reducers/service'
import userReducer from './reducers/user'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    edimaxReducer,
    productReducer,
    serviceReducer,
    userReducer
})
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
export default store;