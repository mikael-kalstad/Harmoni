import axios from "axios";
import Service from "./Service";

interface Attachment{
    attachmentId: number;
    userId: number;
    eventId: number;
    data: File;
}

export default class AttachmentService extends Service{

    // Fetches all attachments for an event by its id
    getAttachmentsForEvent(eventId: number){
        return axios.get<Attachment[]>(this.path + "/attachments/event/" + eventId).then(response => response.data);
    }

    // Fetches all attachments for a user by its id
    getAttachmentsForUser(userId: number){
        return axios.get<Attachment[]>(this.path + "/attachments/user/" + userId).then(response => response.data);
    }

    // Fetches all attachments for a user associated with an event
    getAttachmentsForUserForEvent(userId: number, eventId: number){
        return axios.get<Attachment>(this.path + "/attachments/user/event/" + userId + "/" + eventId).then(response => response.data);
    }

    // Adds an attachment
    addAttachmentForUserForEvent(attachment: Attachment){
        return axios.post(this.path + "/attachments", attachment).then(response => response.data);
    }

    // Updates an attachment
    updateAttachmentForUserForEvent(attachment: Attachment){
        return axios.put(this.path + "/attachments/" + attachment.attachmentId, attachment).then(response => response.data);
    }

    // Deletes an attachment
    deleteAttachmentForUserForEvent(attachmentId: number){
        return axios.delete(this.path + "/attachments/" + attachmentId).then(response => response.data);
    }
}