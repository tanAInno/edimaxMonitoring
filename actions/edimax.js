import { SET_DEVICES,SET_HISTORIES } from "../types/edimax";
export const setDevices = (devices) => {
    return dispatch => {
        dispatch({
            type: SET_DEVICES,
            payload: { devices }
        })
    }
}

export const setHistories = (histories) => {
    return dispatch => {
        dispatch({
            type: SET_HISTORIES,
            payload: { histories }
        })
    }
}