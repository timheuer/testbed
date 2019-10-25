#! /usr/bin/env node
import github = require('@actions/github');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const context = (github as any).context
const issue = context.payload.issue

const msg = {
    to: 'timheuer@microsoft.com',
    from: 'timheuer@microsoft.com',
    subject: 'GitHub Issue Notification for Issue' + issue.number,
    text: issue.title + ":" + issue.body
};

sgMail
    .send(msg)
    .then(() => console.log('Mail sent successfully'))
    .catch(error => console.error(error.toString()));