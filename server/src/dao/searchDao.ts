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
        var sql1 = 'SELECT * FROM event WHERE name like ? or address like ? or information like ? or category like ? order by event_id desc;';

        var sql2 = "Select * from event, user where event.organizer = user.user_id and user.name like ? order by event_id desc;";

        let events: event[];
        super.query(sql1,
            ["%"+input+"%", "%"+input+"%","%"+input+"%","%"+input+"%"],
            (status , data) => {
                if (status == 500){
                    console.log("Error: search for event");
                    callback("error search for events")
                }
                else {
                    events = data.forEach().concat(events);
                    console.log("her er vi ", data);
                    //callback;
                }
            })

        super.query(sql2, ["%"+input+"%"],
            (status , data) => {
                if (status == 500){
                    console.log("Error: search for event");
                    callback("error search for events")
                }
                else {
                    events = data.forEach().concat(events);
                    //callback;
                }
            }
        );
    }
}