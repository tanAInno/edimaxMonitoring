import { SET_PRODUCTS,SET_CHOOSEN_PRODUCTS, SET_CUSTOMER_LIST } from "../types/product"
const initState = {
    products: [],
    choosenProduct: {},
    customerList: []
}
export default (state = initState, action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.payload.products}
        case SET_CHOOSEN_PRODUCTS:
            return {...state, choosenProduct: action.payload.choosenProduct}
        case SET_CUSTOMER_LIST:
            return {...state, customerList: action.payload.customerList}    
        default:
            return state
    }
}