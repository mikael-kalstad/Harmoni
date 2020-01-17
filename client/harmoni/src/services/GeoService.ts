import axios from 'axios';
import Service from './Service';

export default class GeoService extends Service {
  getLatAndLndOfAddress(address: string) {
    let headers = {
      address: address
    };
    return axios
      .get(this.path + '/geo/', { headers: headers })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}

export let geoService = new GeoService();
