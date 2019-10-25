#! /usr/bin/env node
import github = require('@actions/github');

const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const { Remarkable } = require('remarkable');
var md = new Remarkable();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const context = (github as any).context
const issue = context.payload.issue
console.log(issue);
var posted_date = moment(issue.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a");

var msgBody = "";
msgBody = 'NOTICE: BREAKING CHANGE FOR ' + issue;
msgBody = msgBody + '\nANNOUNCEMENT URL: ' + issue.html_url;
msgBody = msgBody + '\nPOSTED AT: ' + posted_date;
msgBody = msgBody + '\n\n\nTITLE: ' + issue.title;
msgBody = msgBody + '\nDetails:\n\n';
var issueBodyPlain = issue.body;
var issueBodyHtml = 'Posted at: ' + posted_date + '<br/>Annnouncement URL: <a href=' + issue.html_url + '>' + issue.html_url + '</a><br/><br/>' + md.render(issue.body); 

const msg = {
    to: 'timheuer@microsoft.com',
    from: '.NET Breaking Changes <timheuer@microsoft.com>',
    subject: 'GitHub Issue Notification for Issue' + issue.number,
    text: issueBodyPlain,
    html: issueBodyHtml
};

sgMail
    .send(msg)
    .then(() => console.log('Mail sent successfully'))
    .catch(error => console.error(error.toString()));