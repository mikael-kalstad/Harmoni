import axios from 'axios';
import Service from "./Service";


class SearchService extends Service{
    searchForEvents(require: string) {
        return axios.get(this.path + '/search/events/'+require)
            .then(response => response.data);
    }
}

export let searchService = new SearchService();
