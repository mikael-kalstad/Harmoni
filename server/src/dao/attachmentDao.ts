const daoParentAttachment = require("./dao.ts");
const Attachment = require("./Attachment.ts");

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

    addAttachmentForUserForEvent(userId: number, eventId: number, data: string, callback){
        super.query("INSERT INTO attachment VALUES(DEFAULT, ?, ?, ?)", [eventId, userId, data], callback);
    }

    updateAttachment(attachment: Attachment, callback){
        super.query("UPDATE attachment SET data = ? WHERE attachment_id = ?", [attachment.data, attachment.attachmentId], callback);
    }
    
    deleteAttachment(attachmentId: number, callback){
        super.query("DELETE FROM attachment WHERE attachment_id = ?", [attachmentId], callback);
    }

}