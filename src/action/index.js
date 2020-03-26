import {
    FETCH_INFOBYCOUNTURY, 
    FETCH_INFOBYCOUNTURY_SUCCESSED, 
    FETCH_INFOBYCOUNTURY_FAILED,

    FETCH_INFOBYCOUNTURY_FIREBASE, 
    FETCH_INFOBYCOUNTURY__FIREBASE_SUCCESSED, 
    FETCH_INFOBYCOUNTURY__FIREBASE_FAILED,

    ADD_REPORT_SUBMIT,
    ADD_REPORT_SUBMIT_SUCCESSED,
    ADD_REPORT_SUBMIT_FAILED,

    FETCH_CONFIRMEDINFO,
    FETCH_CONFIRMEDINFO_SUCCESSED,
    FETCH_CONFIRMEDINFO_FAILED,

    GET_CURRENT_LOCATION,
    GET_CURRENT_LOCATION_SUCCESSED,
    GET_CURRENT_LOCATION_FAILED,


} from  './actionType';

export const fetchInfoByCountry = (param) => {
    return {
        type : FETCH_INFOBYCOUNTURY,
        param
    }
}

export const fetchInfoByCountrySuccess = (receiveProducts) => {
    return {
        type : FETCH_INFOBYCOUNTURY_SUCCESSED,
        receiveInfo
    }
}
export const fetchInfoByCountryFailed = (error) => {
    return {
        type : FETCH_INFOBYCOUNTURY_FAILED,
        error
    }
}
//submit report
export const addReportSubmit = (param) => {
    return {
        type : ADD_REPORT_SUBMIT,
        param
    }
}

//fetch WHO confirmed info
export const fetchConfirmedInfoByCountry = (param) => {

    return {
        type : FETCH_CONFIRMEDINFO,
        param
    }
}
//get current location 
export const getCurrentLocation = (param) => {
    return {
        type : GET_CURRENT_LOCATION,
        param
    }
}
export const fetchInfoFromFirebase = (param) => {
    return {
        type : FETCH_INFOBYCOUNTURY_FIREBASE,
        param
    }    
}