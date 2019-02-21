import { SET_DEVICES,SET_HISTORIES } from "../types/edimax";
const initState = {
    devices: [],
    histories: []
}
export default (state = initState, action) => {
switch(action.type) {
    case SET_DEVICES:
        return {...state, devices: action.payload.devices}
    case SET_HISTORIES:
        return {...state, histories: action.payload.histories}
    default :
        return state
    }
}