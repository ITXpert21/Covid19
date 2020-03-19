import Http from './http';


export default class HomeService {
    static async getInfoByCountry(countryname) {
        const infoByCountry = await Http.get(`https://covid19.mathdro.id/api/countries/${countryname}`);
        return infoByCountry;
    }
}