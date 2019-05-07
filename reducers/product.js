import { SET_PRODUCTS,SET_CHOOSEN_PRODUCTS } from "../types/product"
const initState = {
    products: [],
    choosenProduct: {}
}
export default (state = initState, action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.payload.products}
        case SET_CHOOSEN_PRODUCTS:
            return {...state, choosenProduct: action.payload.choosenProduct}
        default:
            return state
    }
}