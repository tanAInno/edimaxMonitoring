import { SET_PRODUCTS,SET_CHOOSEN_PRODUCTS, SET_CUSTOMER_LIST, SET_TOTAL_PRICE } from "../types/product"
const initState = {
    products: [],
    choosenProduct: {},
    customerList: [],
    totalprice: 0
}
export default (state = initState, action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.payload.products}
        case SET_CHOOSEN_PRODUCTS:
            return {...state, choosenProduct: action.payload.choosenProduct}
        case SET_CUSTOMER_LIST:
            return {...state, customerList: action.payload.customerList}  
        case SET_TOTAL_PRICE:
            return {...state, totalprice: action.payload.totalprice}
        default:
            return state
    }
}