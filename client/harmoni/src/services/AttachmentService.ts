import axios from 'axios';
import Service from './Service';

interface Attachment {
  attachmentId: number;
  userId: number;
  eventId: number;
  data: File;
}

class AttachmentService extends Service {
  // Fetches all attachments for an event by its id
  getAttachmentsForEvent(eventId: number) {
    return axios
      .get<Attachment[]>(this.path + '/authorized/attachments/event/' + eventId)
      .then(response => response.data);
  }

  // Fetches all attachments for a user by its id
  getAttachmentsForUser(userId: number) {
    return axios
      .get<Attachment[]>(this.path + '/authorized/attachments/user/' + userId)
      .then(response => response.data);
  }

  // Fetches all attachments for a user associated with an event
  getAttachmentsForUserForEvent(userId: number, eventId: number) {
    return axios
      .get<Attachment>(
        this.path + '/authorized/attachments/user/' + userId + '&' + eventId
      )
      .then(response => response.data);
  }

  // Adds an attachment
  addAttachment(attachment: Attachment) {
    return axios
      .post(this.path + '/authorized/attachments/', attachment)
      .then(response => response.data);
  }

  // Updates an attachment
  updateAttachment(attachment: Attachment) {
    return axios
      .put(this.path + '/authorized/attachments/' + attachment.attachmentId, attachment)
      .then(response => response.data);
  }

  // Deletes an attachment
  deleteAttachment(attachmentId: number) {
    return axios
      .delete(this.path + '/authorized/attachments/' + attachmentId)
      .then(response => response.data);
  }

  // Add user to attachment in attachment_user table in DB
  addUserForAttachment(attachmentId: number, userId: number) {
    return axios
      .post(this.path + '/authorized/attachment_user/' + attachmentId + '&' + userId)
      .then(response => response.data);
  }
  // Delete user to attachment in attachment_user table in DB
  deleteAttachmentforUser(attachmentId: number, userId: number) {
    return axios
      .post(this.path + '/authorized/attachment_user/' + attachmentId + '&' + userId)
      .then(response => response.data);
  }
}

export let attachmentService = new AttachmentService();
