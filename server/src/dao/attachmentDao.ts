const daoParentAttachment = require("./dao.ts");
const Attachment = require("./Attachment.ts");

export interface attachment{
    attachment_id: number;
    user_id: number;
    event_id: number;
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
        super.query("INSERT INTO attachment VALUES(DEFAULT, ?, ?, ?)", [data.event_id, data.user_id, data.data], callback);
    }
    addUserForAttachment(attachmentId:number , userId: number, callback){
        super.query("INSERT INTO attachment_user VALUES( ?, ?)", [attachmentId ,userId], callback);
    }
    deleteAttachmentForUser(attachmentId:number , userId: number, callback){
        super.query("DELETE FROM attachment_user WHERE attachment_id = ? AND user_id = ?", [attachmentId,userId], callback);
    }
    updateAttachment(data: attachment, callback){
        super.query("UPDATE attachment SET data = ? WHERE attachment_id = ?", [data.data, data.attachment_id], callback);
    }
    
    deleteAttachment(attachmentId: number, callback){
        super.query("DELETE FROM attachment WHERE attachment_id = ?", [attachmentId], callback);
    }
}