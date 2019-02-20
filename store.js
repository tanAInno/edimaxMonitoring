import { createStore, combineReducers, applyMiddleware } from 'redux'
import edimaxReducer from './reducers/edimax'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    edimaxReducer,
})
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
export default store;