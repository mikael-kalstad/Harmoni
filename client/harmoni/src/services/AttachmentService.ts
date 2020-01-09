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
        return axios.get<Attachment>(this.path + "/attachments/user/" + userId + "&" + eventId).then(response => response.data);
    }

    // Adds an attachment
    addAttachment(attachment: Attachment){
        return axios.post(this.path + "/attachments/", attachment).then(response => response.data);
    }

    // Updates an attachment
    updateAttachment(attachment: Attachment){
        return axios.put(this.path + "/attachments/" + attachment.attachmentId, attachment).then(response => response.data);
    }

    // Deletes an attachment
    deleteAttachment(attachmentId: number){
        return axios.delete(this.path + "/attachments/" + attachmentId).then(response => response.data);
    }

    // Add user to attachment in attachment_user table in DB
    addUserForAttachment(attachmentId: number, userId: number){
        return axios.post(this.path + "/attachment_user/"+attachmentId+"&"+userId).then(response => response.data);
    }
    // Delete user to attachment in attachment_user table in DB 
    deleteAttachmentforUser(attachmentId: number, userId: number){
        return axios.post(this.path + "/attachment_user/"+attachmentId+"&"+userId).then(response => response.data);
    }
}