import { SET_USER, SET_MENU, SET_ADDRESS, SET_COMPANY, SET_DISTRICT, SET_EMAIL, SET_NAME, SET_PHONE, SET_PROVINCE, SET_SUBDISTRICT, SET_SURNAME, SET_USER_ID, SET_ZIPCODE } from '../types/user'

export const setUser = (user) => {
    return dispatch => {
        dispatch({
            type: SET_USER,
            payload: { user }
        })
    }
}

export const setMenu = (menu) => {
    return dispatch => {
        dispatch({
            type: SET_MENU,
            payload: { menu }
        })
    }
}

export const setUserId = (user_id) => {
    return dispatch => {
        dispatch({
            type: SET_USER_ID,
            payload: { user_id }
        })
    }
}

export const setName = (name) => {    
    return dispatch => {
        dispatch({
            type: SET_NAME,
            payload: { name }
        })
    }
}

export const setSurname = (surname) => {
    return dispatch => {
        dispatch({
            type: SET_SURNAME,
            payload: { surname }
        })
    }
}

export const setEmail = (email) => {
    return dispatch => {
        dispatch({
            type: SET_EMAIL,
            payload: { email }
        })
    }
}

export const setPhone = (phone) => {
    return dispatch => {
        dispatch({
            type: SET_PHONE,
            payload: { phone }
        })
    }
}

export const setCompany = (company) => {
    return dispatch => {
        dispatch({
            type: SET_COMPANY,
            payload: { company }
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

export const setSubdistrict = (subdistrict) => {
    return dispatch => {
        dispatch({
            type: SET_SUBDISTRICT,
            payload: { subdistrict }
        })
    }
}

export const setDistrict = (district) => {
    return dispatch => {
        dispatch({
            type: SET_DISTRICT,
            payload: { district }
        })
    }
}

export const setProvince = (province) => {
    return dispatch => {
        dispatch({
            type: SET_PROVINCE,
            payload: { province }
        })
    }
}

export const setZipcode = (zipcode) => {
    return dispatch => {
        dispatch({
            type: SET_ZIPCODE,
            payload: { zipcode }
        })
    }
}

