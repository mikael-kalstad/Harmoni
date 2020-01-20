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
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/event/' + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }
   

  // Fetches all attachments for a user by its id
  getAttachmentsForUploader(userId: number) {
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/user/' + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }


  //Fetches all attachments a user has uploaded to an event given eventId,userId
  getAttachmentsForUploaderForEvent(userId: number, eventId: number) {
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/user/' + userId + '&' + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }
  
  //Fetches all attachments a user has access to
  getAttachmentsForUser(userId: number){
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/user/access' + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

   //Fetches all attachments a user has access to for an event
   getAttachmentsForUserForEvent(userId: number, eventId: number){
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/user/access' + userId + '&' + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

  // Adds an attachment
  addAttachment(attachment: Attachment) {
    updateToken();
    return axios({
      method: 'post',
      url: this.path + '/authorized/attachments/',
      data: attachment,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }
  
  getAttachment(attachmentId: number){
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/' + attachmentId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }
  

  // Updates an attachment
  updateAttachment(attachment: Attachment) {
    updateToken();
    return axios({
      method: 'put',
      url: this.path + '/authorized/attachments/' + attachment.attachmentId,
      data: attachment,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

  // Deletes an attachment
  deleteAttachment(attachmentId: number) {
    updateToken();
    return axios({
      method: 'delete',
      url: this.path + '/authorized/attachments/' + attachmentId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

  downloadAttachment(attachmentId: number){
    updateToken();
    return axios({
      method: 'get',
      url: this.path + '/authorized/attachments/download/' + attachmentId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

  // Add user to attachment in attachment_user table in DB
  addUserForAttachment(attachmentId: number, userId: number) {
    updateToken();
    return axios({
      method: 'post',
      url: this.path + '/authorized/attachment_user/' + attachmentId + '&' + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

  // Delete user to attachment in attachment_user table in DB
  deleteAttachmentforUser(attachmentId: number, userId: number) {
    updateToken();
    return axios({
      method: 'delete',
      url: this.path + '/authorized/attachment_user/' + attachmentId + '&' + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    }).then(response =>  response.data).catch(error => console.log(error));
  }

}

export let attachmentService = new AttachmentService();
