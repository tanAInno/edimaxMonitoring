import { SET_USER, SET_MENU, SET_ADDRESS, SET_COMPANY, SET_DISTRICT, SET_EMAIL, 
    SET_NAME, SET_PHONE, SET_PROVINCE, SET_SUBDISTRICT, SET_SURNAME, SET_USER_ID, SET_ZIPCODE } from '../types/user'

const initState = {
    user: {},
    menu: '',
    address: '',
    company: '',
    district: '',
    email: '',
    name: '',
    phone: '',
    province: '',
    subdistrict: '',
    surname: '',
    user_id: '',
    zipcode: '',
}
export default (state = initState, action) => {
switch(action.type) {
    case SET_USER:{
        return {...state, user: action.payload.user}
    }
    case SET_MENU:{
        return {...state, menu: action.payload.menu}
    }
    case SET_ADDRESS:{
        return {...state, address: action.payload.address}
    }
    case SET_COMPANY:{
        return {...state, company: action.payload.company}
    }
    case SET_DISTRICT:{
        return {...state, district: action.payload.district}
    }
    case SET_EMAIL:{
        return {...state, email: action.payload.email}
    }
    case SET_NAME:{
        return {...state, name: action.payload.name}
    }
    case SET_PHONE:{
        return {...state, phone: action.payload.phone}
    }
    case SET_PROVINCE:{
        return {...state, province: action.payload.province}
    }
    case SET_SUBDISTRICT:{
        return {...state, subdistrict: action.payload.subdistrict}
    }
    case SET_SURNAME:{
        return {...state, surname: action.payload.surname}
    }
    case SET_USER_ID:{
        return {...state, user_id: action.payload.user_id}
    }
    case SET_ZIPCODE:{
        return {...state, zipcode: action.payload.zipcode}
    }
    default :
        return state
    }
}