const daoParentEvent = require('./dao.ts');
//import {event} from "./eventDao";

export interface user {
    user_id: number,
    name: string,
    mobile: number,
    email: string,
    hash: string,
    salt: string,
    type: string,
    picture: string
}

export interface event {
    event_id: number,
    organizer: number,
    name: string,
    address: string,
    from_date: string,
    to_date: string,
    capacity: number,
    status: string,
    information: string,
    category: string,
    picture: string
}

export default class searchDao extends daoParentEvent {
    constructor(pool) {
        super(pool);
    }
    // Search for an events
    searchForEvents(input: string, callback) {
        var sql1 =
            'SELECT DISTINCT * FROM event WHERE name LIKE ? OR address LIKE ? OR information LIKE ? OR category LIKE ? or status like ? ORDER BY event_id DESC;';

        var sql2 = "SELECT DISTINCT * FROM event, user WHERE event.organizer = user.user_id AND user.name LIKE ? and user.type='artist' ORDER BY event_id DESC;";

        let events: event[] = [];
        super.query(sql1,
            ["%"+input+"%", "%"+input+"%","%"+input+"%","%"+input+"%","%"+input+"%"],
            (status , data) => {
                if (status == 500){
                    callback(500, null);
                }
                else {
                    data.forEach(e => events.push(e));
                    super.query(sql2, ["%"+input+"%"],
                    (status , data) => {
                        if (status == 500){
                            callback(500, null);
                        }
                        else {
                            data.forEach(e => events.push(e));
                            callback(200, events);
                        }
                    }
                );
                }
            })
    }
    // Sort events by tickets' lowest price
    sortCheapestEvents(callback) {
    var sql = 'SELECT DISTINCT * from event, ticket WHERE event.event_id = ticket.event_id ORDER by ticket.price ASC;';
        super.query( sql,[],
            callback
        );
    }

    // Sort events by tickets' lowest price
    sortExpensiveEvents(callback) {
        var sql = 'SELECT DISTINCT * from event, ticket WHERE event.event_id = ticket.event_id ORDER by ticket.price desc;';
        super.query( sql,[],
            callback
        );
    }
}