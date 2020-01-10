const daoParentEvent = require('./dao.ts');
import {event} from "./eventDao";

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
                }
            }
        );
    }
}