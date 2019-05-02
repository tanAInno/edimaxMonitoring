import { SET_PRODUCTS } from "../types/product";
export const setProducts = (products) => {
    return dispatch => {
        dispatch({
            type: SET_PRODUCTS,
            payload: { products }
        })
    }
}