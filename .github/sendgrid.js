#! /usr/bin/env node
"use strict";
exports.__esModule = true;
var github = require("@actions/github");
var sgMail = require('@sendgrid/mail');
var moment = require('moment');
var Remarkable = require('remarkable').Remarkable;
var md = new Remarkable();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var context = github.context;
var issue = context.payload.issue;
var posted_date = moment(issue.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
var msgBody = "";
msgBody = 'NOTICE: BREAKING CHANGE FOR ' + issue.repository;
msgBody = msgBody + '\nANNOUNCEMENT URL: ' + issue.url;
msgBody = msgBody + '\nPOSTED AT: ' + posted_date;
msgBody = msgBody + '\n\n\nTITLE: ' + issue.title;
msgBody = msgBody + '\nDetails:\n\n';
var issueBodyPlain = issue.body;
var issueBodyHtml = md.render(msgBody) + md.render(issue.body);
var msg = {
    to: 'timheuer@microsoft.com',
    from: '.NET Breaking Changes <timheuer@microsoft.com>',
    subject: 'GitHub Issue Notification for Issue' + issue.number,
    text: msgBody + issueBodyPlain,
    html: issueBodyHtml
};
sgMail
    .send(msg)
    .then(function () { return console.log('Mail sent successfully'); })["catch"](function (error) { return console.error(error.toString()); });
