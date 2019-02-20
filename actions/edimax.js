import { SET_DEVICES } from "../types/edimax";
export const setDevices = (devices) => {
    return dispatch => {
        dispatch({
            type: SET_DEVICES,
            payload: { devices }
        })
    }
}