import { SET_SERVICES, SET_TOTAL_PRICE, SET_SELECTED_DATE, SET_SELECTED_TIME } from '../types/service'
const initState = {
    services: [],
    totalprice: 0,
    selectedDate: '',
    selectedTime: ''
}
export default (state = initState, action) => {
    switch(action.type) {
        case SET_SERVICES:
            return {...state, services: action.payload.services}
        case SET_TOTAL_PRICE:
            return {...state, totalprice: action.payload.totalprice}
        case SET_SELECTED_DATE:
            return {...state, selectedDate: action.payload.selectedDate}
        case SET_SELECTED_TIME:
            return {...state, selectedTime: action.payload.selectedTime}
        default:
            return state
    }
}
