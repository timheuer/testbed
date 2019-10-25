#! /usr/bin/env node
import github = require('@actions/github');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const context = (github as any).context
const issue = context.payload.issue

var msgBody = "";
msgBody = 'NOTICE: BREAKING CHANGE FOR ' + issue.repository.full_name;
msgBody = msgBody + '\nANNOUNCEMENT URL: ' + issue.url;
msgBody = msgBody + '\n\n\nTITLE: ' + issue.title;
msgBody = msgBody + '\nDetails:';
msgBody = msgBody + '\n' + issue.body
msgBody = msgBody + '\n\n\n' + issue.created_at;

const msg = {
    to: 'timheuer@microsoft.com',
    from: '.NET Breaking Changes <timheuer@microsoft.com>',
    subject: 'GitHub Issue Notification for Issue' + issue.number,
    text: msgBody
};

sgMail
    .send(msg)
    .then(() => console.log('Mail sent successfully'))
    .catch(error => console.error(error.toString()));