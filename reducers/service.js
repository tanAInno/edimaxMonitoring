import { SET_SERVICES, SET_TOTAL_SERVICE_PRICE, SET_SELECTED_DATE, SET_SELECTED_TIME, SET_SERVICE_ADDRESS, SET_ADDITION } from '../types/service'
const initState = {
    services: [],
    totalprice: 0,
    selectedDate: '',
    selectedTime: '',
    serviceaddress: { name: "", phone: "",addressNumber: "", housing: "", road: "", subdistrict: "", district: "", province: ""},
    addition: { type: "", detail: "", img: ""}
}
export default (state = initState, action) => {
    switch(action.type) {
        case SET_SERVICES:
            return {...state, services: action.payload.services}
        case SET_TOTAL_SERVICE_PRICE:
            return {...state, totalprice: action.payload.totalprice}
        case SET_SELECTED_DATE:
            return {...state, selectedDate: action.payload.selectedDate}
        case SET_SELECTED_TIME:
            return {...state, selectedTime: action.payload.selectedTime}
        case SET_SERVICE_ADDRESS:
            return {...state, serviceaddress: action.payload.serviceaddress}
        case SET_ADDITION:
            return {...state, addition: action.payload.addition}
        default:
            return state
    }
}
