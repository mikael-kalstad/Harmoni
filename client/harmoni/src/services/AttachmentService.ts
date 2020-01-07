import axios from "axios";
import Service from "./Service";

interface Attachment{
    attachmentId: number;
    userId: number;
    eventId: number;
    data: File;
}

export default class AttachmentService extends Service{

    getAttachmentsForEvent(eventId: number){
        return axios.get<Attachment[]>(this.path + "/attachment/event/" + eventId).then(response => response.data);
    }

    getAttachmentsForUser(userId: number){
        return axios.get<Attachment[]>(this.path + "/attachment/user/" + userId).then(response => response.data);
    }

    getAttachmentsForUserForEvent(){
        return axios.get<Attachment>(this.path + "/attachment/FYLLINNHER").then(response => response.data);
    }

    addAttachmentForUserForEvent(attachment: Attachment){
        return axios.post(this.path + "/attachment/", attachment).then(response => response.data);
    }

    updateAttachmentForUserForEvent(attachment: Attachment){
        return axios.put(this.path + "/attachment/").then(response => response.data);
    }
}