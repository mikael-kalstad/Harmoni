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
        super.query("SELECT * FROM attachment WHERE event_id = ?", [eventId], callback);
    }

    getAttachmentsForUser(userId: number, callback) {
        super.query("SELECT * FROM attachment WHERE user_id = ?", [userId], callback);
    }

    getAttachmentsForUserForEvent(userId: number, eventId: number, callback) {
        super.query("SELECT * FROM attachment WHERE event_id = ? AND user_id = ?", [eventId, userId], callback)
    }

    getAttachmentById(attachment_id: number, callback){
        super.query("SELECT * FROM attachment WHERE attachment_id = ?", [attachment_id], callback);
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
        console.log(data);
        data.body = JSON.parse(data.body);
        super.query("INSERT INTO attachment VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)",
            [data.body.event_id, data.body.user_id, data.attachment.data, data.attachment.filetype,
            data.attachment.filename, data.attachment.filesize], afterInsertEvent);
    }
    addUserForAttachment(attachmentId: number, userId: number, callback) {
        super.query("INSERT INTO attachment_user VALUES(?, ?)", [attachmentId, userId], callback);
    }
    deleteAttachmentForUser(attachmentId: number, userId: number, callback) {
        super.query("DELETE FROM attachment_user WHERE attachment_id = ? AND user_id = ?", [attachmentId, userId], callback);
    }
    updateAttachment(data: attachment, callback) {
        super.query("UPDATE attachment SET data = ?, filetype = ?, filename = ?, filesize = ? WHERE attachment_id = ?",
            [data.data, data.filetype, data.filename, data.filesize, data.attachment_id], callback);
    }

    deleteAttachment(attachmentId: number, callback) {
        super.query("DELETE FROM attachment WHERE attachment_id = ?", [attachmentId], callback);
    }
}