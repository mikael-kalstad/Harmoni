import axios from 'axios';


var path = require('path');
var async = require('async');
var  _ = require('lodash');
var hbs = require('nodemailer-express-handlebars');
var email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';
var pass = process.env.MAILER_PASSWORD || 'auth_email_pass';
var nodemailer = require('nodemailer');



export default class PasswordService {
    requestPasswordReset(email:string){
        const headers = {
            'Content-Type': 'application/json; charset=utf-8'
            
        }
        var postData = {
            email: email
        };
        return axios.post("http://localhost:15016/auth/",postData,{
            headers: headers
        })
            .then(response =>{
                return response;
            } )
            .catch(error => console.log(error)); 
    }
    updatePassword(password: string ){
        
          var postData = {
            password: password
        };
        return axios.post("http://localhost:15016/auth/update_password",postData,{
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
                
            }
        })
            .then(response =>{
                return response;
            } )
            .catch(error => console.log(error)); 
    }
}
    

export let passwordService = new PasswordService();