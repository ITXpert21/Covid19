import Http from './http';


export default class MapService {
    static async getInfoByCountry(countryname) {

        console.log('service');
        //  const infoByCountry = await Http.get(`https://covid19.mathdro.id/api/countries/${countryname}/confirmed`);
        
        const infoByCountry = await Http.get(`https://coronavirus-tracker-api.herokuapp.com/v2/locations`);
        return infoByCountry;
    }
}