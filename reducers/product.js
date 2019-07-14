import { SET_PRODUCTS,SET_CHOOSEN_PRODUCTS, SET_CUSTOMER_LIST, SET_TOTAL_PRODUCT_PRICE, SET_COUPON_LIST } from "../types/product"
const initState = {
    products: [],
    choosenProduct: {},
    customerList: [],
    totalprice: 0,
    couponList: []
}
export default (state = initState, action) => {
    switch(action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.payload.products}
        case SET_CHOOSEN_PRODUCTS:
            return {...state, choosenProduct: action.payload.choosenProduct}
        case SET_CUSTOMER_LIST:
            return {...state, customerList: action.payload.customerList}  
        case SET_TOTAL_PRODUCT_PRICE:
            return {...state, totalprice: action.payload.totalprice}
        case SET_COUPON_LIST:
            return {...state, couponList: action.payload.couponList}
        default:
            return state
    }
}