import { SET_SERVICES, SET_TOTAL_PRICE, SET_SELECTED_DATE, SET_SELECTED_TIME } from '../types/service'

export const setServices = (services) => {
    return dispatch => {
        dispatch({
            type: SET_SERVICES,
            payload: { services }
        })
    }
}

export const setTotalPrice = (totalprice) => {
    return dispatch => {
        dispatch({
            type: SET_TOTAL_PRICE,
            payload: { totalprice }
        })
    }
}

export const setSelectedDate = (selectedDate) => {
    return dispatch => {
        dispatch({
            type: SET_SELECTED_DATE,
            payload: { selectedDate }
        })
    }
}

export const setSelectedTime = (selectedTime) => {
    return dispatch => {
        dispatch({
            type: SET_SELECTED_TIME,
            payload: { selectedTime }
        })
    }
}