#! /usr/bin/env node
"use strict";
exports.__esModule = true;
var github = require("@actions/github");
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var context = github.context;
var issue = context.payload.issue;
var msgBody = "";
msgBody = 'NOTICE: BREAKING CHANGE FOR ' + issue.repository.full_name;
msgBody = msgBody + '\nANNOUNCEMENT URL: ' + issue.url;
msgBody = msgBody + '\n\n\nTITLE: ' + issue.title;
msgBody = msgBody + '\nDetails:';
msgBody = msgBody + '\n' + issue.body;
msgBody = msgBody + '\n\n\n' + issue.created_at;
var msg = {
    to: 'timheuer@microsoft.com',
    from: '.NET Breaking Changes <timheuer@microsoft.com>',
    subject: 'GitHub Issue Notification for Issue' + issue.number,
    text: msgBody
};
sgMail
    .send(msg)
    .then(function () { return console.log('Mail sent successfully'); })["catch"](function (error) { return console.error(error.toString()); });
