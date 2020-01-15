import axios from 'axios';
import Service, {updateToken} from './Service';

interface Attachment {
  attachmentId: number;
  userId: number;
  eventId: number;
  data: File;
}

class AttachmentService extends Service {
  // Fetches all attachments for an event by its id
  getAttachmentsForEvent(eventId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get<Attachment[]>(this.path + '/authorized/attachments/event/' + eventId, {headers:headers})
      .then(response => response.data);
  }

  // Fetches all attachments for a user by its id
  getAttachmentsForUser(userId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get<Attachment[]>(this.path + '/authorized/attachments/user/' + userId, {headers:headers})
      .then(response => response.data);
  }

  // Fetches all attachments for a user associated with an event
  getAttachmentsForUserForEvent(userId: number, eventId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .get<Attachment>(
        this.path + '/authorized/attachments/user/' + userId + '&' + eventId
          , {headers:headers})
      .then(response => response.data);
  }

  // Adds an attachment
  addAttachment(attachment: Attachment) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .post(this.path + '/authorized/attachments/', attachment, {headers:headers})
      .then(response => response.data);
  }

  // Updates an attachment
  updateAttachment(attachment: Attachment) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .put(this.path + '/authorized/attachments/' + attachment.attachmentId, attachment, {headers:headers})
      .then(response => response.data);
  }

  // Deletes an attachment
  deleteAttachment(attachmentId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .delete(this.path + '/authorized/attachments/' + attachmentId, {headers:headers})
      .then(response => response.data);
  }

  // Add user to attachment in attachment_user table in DB
  addUserForAttachment(attachmentId: number, userId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .post(this.path + '/authorized/attachment_user/' + attachmentId + '&' + userId, {headers:headers})
      .then(response => response.data);
  }
  // Delete user to attachment in attachment_user table in DB
  deleteAttachmentforUser(attachmentId: number, userId: number) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "harmoni-token": localStorage.getItem("harmoni-token")
    };
    updateToken();
    return axios
      .post(this.path + '/authorized/attachment_user/' + attachmentId + '&' + userId, {headers:headers})
      .then(response => response.data);
  }
}

export let attachmentService = new AttachmentService();
