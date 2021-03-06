import { SET_PRODUCTS, SET_CHOOSEN_PRODUCTS, SET_CUSTOMER_LIST, SET_TOTAL_PRODUCT_PRICE, SET_COUPON_LIST } from "../types/product";
export const setProducts = (products) => {
    return dispatch => {
        dispatch({
            type: SET_PRODUCTS,
            payload: { products }
        })
    }
}

export const setChoosenProduct = (choosenProduct) => {
    return dispatch => {
        dispatch({
            type: SET_CHOOSEN_PRODUCTS,
            payload: { choosenProduct }
        })
    }
}

export const setCustomerList = (customerList) => {
    return dispatch => {
        dispatch({
            type: SET_CUSTOMER_LIST,
            payload: { customerList }
        })
    }
}

export const setTotalProductPrice = (totalprice) => {
    return dispatch => {
        dispatch({
            type: SET_TOTAL_PRODUCT_PRICE,
            payload: { totalprice }
        })
    }
}

export const setCouponList = (couponList) => {
    return dispatch => {
        dispatch({
            type: SET_COUPON_LIST,
            payload: { couponList }
        })
    }
}