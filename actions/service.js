import { SET_SERVICES, SET_TOTAL_SERVICE_PRICE, SET_SELECTED_DATE, SET_SELECTED_TIME, SET_ADDRESS, SET_ADDITION } from '../types/service'

export const setServices = (services) => {
    return dispatch => {
        dispatch({
            type: SET_SERVICES,
            payload: { services }
        })
    }
}

export const setTotalServicePrice = (totalprice) => {
    return dispatch => {
        dispatch({
            type: SET_TOTAL_SERVICE_PRICE,
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

export const setAddition = (addition) => {
    return dispatch => {
        dispatch({
            type: SET_ADDITION,
            payload: { addition }
        })
    }
}

export const setAddress = (address) => {
    return dispatch => {
        dispatch({
            type: SET_ADDRESS,
            payload: { address }
        })
    }
}