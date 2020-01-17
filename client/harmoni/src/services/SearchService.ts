import axios from 'axios';
import Service from "./Service";


class SearchService extends Service{
    searchForEvents(require: string) {
        if( require){
            return axios.get(this.path + '/search/events/'+require)
                .then(response => response.data);
        }
    }
    sortAfterLowPrice() {
        return axios.get(this.path + '/search/events/cheapest')
            .then(response => response.data);
    }
    sortAfterHighPrice() {
        return axios.get(this.path + '/search/events/most_expensive')
            .then(response => response.data);
    }
}

export let searchService = new SearchService();
