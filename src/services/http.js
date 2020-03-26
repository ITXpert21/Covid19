const myApiKey = 'AIzaSyB8nm4Avunu0rENuo2tpWgV8jKUKLFbESw';
export default class Http {
    static async get(url) {
        const response = await fetch(url);
        // if (response.status === 401) {
        //     window.localStorage.removeItem('authToken');
        //     window.location = '/';
        // }
        return response.json();
    }
 

}
