import { SET_PRODUCTS, SET_CHOOSEN_PRODUCTS } from "../types/product";
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