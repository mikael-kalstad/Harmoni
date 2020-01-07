const daoParentAttachment = require("./dao.ts");
const Attachment = require("./Attachment.ts");

export default class attachmentDao extends daoParentAttachment{
    constructor(pool){
        super(pool);
    }

    getAttachmentsForEvent(eventId: number, callback){
        super.query("SELECT * FROM attachment WHERE event_id = ?", [eventId], callback);
    }

    getAttachmentsForUser(userId: number, callback){
        super.query("SELECT * FROM attachment WHERE user_id = ?", [userId], callback);
    }

    getAttachmentsForUserForEvent(eventId: number, userId: number, callback){
        super.query("SELECT * FROM attachment WHERE event_id = ? AND user_id = ?", [eventId, userId], callback)
    }

    addAttachmentForUserForEvent(eventId: number, userId: number, data: string, callback){
        super.query("INSERT INTO attachment VALUES(DEFAULT, ?, ?, ?)", [eventId, userId, data], callback);
    }

    updateAttachmentForUserForEvent(eventId: number, userId: number, data: string, callback){
        super.query("UPDATE attachment SET data = ? WHERE event_id = ? AND user_id = ?", [data, eventId, userId], callback);
    }

}