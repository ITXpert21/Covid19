
import {ENDPOINT_URL} from '../config/config'

function* getProductsByDispensary(id){
    console.log("22222222", base_url);

    // const base_url = ENDPOINT_URL + 'products/1'
    // const response = yield fetch( base_url, {
    //     method : 'GET',
    //     headers : {
    //         Accept : 'application/json',
    //         'Content-type' : 'application/json'
    //     },
    //     body : '',
    // });
    // console.log("respponse ====", response);
    // const products = yield response.status === 200 ? JSON.parse(response._bodyInit) : [];
    return 1;
}
export const productApi = {
    getProductsByDispensary
};