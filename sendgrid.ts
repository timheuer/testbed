#! /usr/bin/env node
import github = require('@actions/github');

const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const md = require('remarkable');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const context = (github as any).context
const issue = context.payload.issue

var posted_date = moment(issue.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a");

var msgBody = "";
msgBody = 'NOTICE: BREAKING CHANGE FOR ' + issue.repository;
msgBody = msgBody + '\nANNOUNCEMENT URL: ' + issue.url;
msgBody = msgBody + '\nPOSTED AT: ' + posted_date;
msgBody = msgBody + '\n\n\nTITLE: ' + issue.title;
msgBody = msgBody + '\nDetails:\n\n';
var issueBodyPlain = issue.body;
var issueBodyHtml = md.render(msgBody) + md.render(issue.body); 

const msg = {
    to: 'timheuer@microsoft.com',
    from: '.NET Breaking Changes <timheuer@microsoft.com>',
    subject: 'GitHub Issue Notification for Issue' + issue.number,
    text: msgBody + issueBodyPlain,
    html: issueBodyHtml
};

sgMail
    .send(msg)
    .then(() => console.log('Mail sent successfully'))
    .catch(error => console.error(error.toString()));