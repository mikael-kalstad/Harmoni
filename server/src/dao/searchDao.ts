/**
 * The attachmentDao-class is used to do everything has to do with
 * Search or sort after price
 */
const daoParentEvent = require('./dao.ts');

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

    /**
     * Search for an event given,
     * @param input from client which can be status,artistName...ect
     * @param callback
     */
    searchForEvents(input: string, callback) {
        var sql1 = 'SELECT DISTINCT * FROM event WHERE name LIKE ? OR address LIKE ? OR information LIKE ? OR category LIKE ? or status like ? ORDER BY event_id DESC;';

        var sql2 = "SELECT DISTINCT * FROM event, user WHERE event.organizer = user.user_id AND user.name LIKE ? ORDER BY event_id DESC;";

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
}