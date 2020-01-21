const daoParentAttachment = require("./dao");

export interface attachment {
    attachment_id: number;
    user_id: number;
    event_id: number;
    data: string;
    filename: string;
    filetype: string;
    filesize: number;
}

export default class attachmentDao extends daoParentAttachment {
    constructor(pool) {
        super(pool);
    }

    getAttachmentsForEvent(eventId: number, callback) {
        super.query("SELECT attachment_id, filename, filetype, filesize FROM attachment WHERE event_id = ?", [eventId], callback);
    }

    //Gets all uploaded files for an user
    getAttachmentsForUploader(userId: number, callback) {
        super.query("SELECT attachment_id, filename, filetype, filesize FROM attachment WHERE user_id = ?", [userId], callback);
    }

    getAttachmentsForUploaderForEvent(userId: number, eventId: number, callback) {
        super.query("SELECT attachment_id, filename, filetype, filesize FROM attachment WHERE event_id = ? AND user_id = ?", [eventId, userId], callback);
    }

    //For downloading the file
    getAttachmentById(attachment_id: number, callback){
        super.query("SELECT * FROM attachment WHERE attachment_id = ?", [attachment_id], callback);
    }

    //Get all files an user has access to, either uploaded himself or given access to 
    getAttachmentsForUser(userId: number, callback){
        super.query("SELECT DISTINCT attachment.attachment_id, filename FROM attachment, attachment_user WHERE attachment.attachment_id = attachment_user.attachment_id AND attachment_user.user_id = ? OR attachment.user_id = ?", [userId, userId], callback);
    }

    //Get all files for an user for an event
    getAttachmentsForUserForEvent(userId: number, eventId: number, callback){
        super.query("SELECT DISTINCT attachment.attachment_id, filename FROM attachment LEFT JOIN attachment_user ON attachment.attachment_id = attachment_user.attachment_id WHERE (attachment_user.user_id = ? OR attachment.user_id = ?) AND attachment.event_id = ?", [userId, userId, eventId], callback);
    }

    addAttachmentForUserForEvent(data: any, callback) {
        const afterInsertEvent = (status, rows) => {
            if (status == 500) {
                callback(500, rows);
            }
            else {
                super.query('INSERT INTO attachment_user VALUES(?, ?)', [rows.insertId, data.body.user_id], () => { callback(status, rows) })
            }
        }
        super.query("INSERT INTO attachment VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)",
            [data.body.event_id, data.body.user_id, data.attachment.data, data.attachment.filetype,
            data.attachment.filename, data.attachment.filesize], afterInsertEvent);
    }
    
    addUserForAttachment(attachmentId: number, userId: number, callback) {
        super.query("INSERT INTO attachment_user VALUES(?, ?)", [attachmentId, userId], callback);
    }
    // Deletes the access to a document for an user
    deleteAttachmentForUser(attachmentId: number, userId: number, callback) {
        super.query("DELETE FROM attachment_user WHERE attachment_id = ? AND user_id = ?", [attachmentId, userId], callback);
    }
    updateAttachment(data: attachment, callback) {
        super.query("UPDATE attachment SET data = ?, filetype = ?, filename = ?, filesize = ? WHERE attachment_id = ?",
            [data.data, data.filetype, data.filename, data.filesize, data.attachment_id], callback);
    }
    // Deletes attachment given attachmentId
    deleteAttachment(attachmentId: number, callback) {
        super.query("DELETE FROM attachment WHERE attachment_id = ?", [attachmentId], callback);
    }
}