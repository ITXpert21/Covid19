import {
    FETCH_INFOBYCOUNTURY, 
    FETCH_INFOBYCOUNTURY_SUCCESSED, 
    FETCH_INFOBYCOUNTURY_FAILED
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
