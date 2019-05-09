import { SET_PRODUCTS, SET_CHOOSEN_PRODUCTS, SET_CUSTOMER_LIST } from "../types/product";
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