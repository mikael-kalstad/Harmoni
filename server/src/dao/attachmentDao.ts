const daoParentAttachment = require("./dao.ts");

export interface attachment{
    attachmentId: number;
    userId: number;
    eventId: number;
    data: File;
}

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

    getAttachmentsForUserForEvent(userId: number, eventId: number, callback){
        super.query("SELECT * FROM attachment WHERE event_id = ? AND user_id = ?", [eventId, userId], callback)
    }

    addAttachmentForUserForEvent(data: attachment, callback){
        super.query("INSERT INTO attachment VALUES(DEFAULT, ?, ?, ?)", [data.eventId, data.userId, data.data], callback);
    }

    updateAttachment(data: attachment, callback){
        super.query("UPDATE attachment SET data = ? WHERE attachment_id = ?", [data.data, data.attachmentId], callback);
    }
    
    deleteAttachment(attachmentId: number, callback){
        super.query("DELETE FROM attachment WHERE attachment_id = ?", [attachmentId], callback);
    }
}