#! /usr/bin/env node
"use strict";
exports.__esModule = true;
var github = require("@actions/github");
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var context = github.context;
var issue = context.payload.issue;
var msg = {
    to: 'timheuer@microsoft.com',
    from: 'timheuer@microsoft.com',
    subject: 'GitHub Issue Notification for Issue' + issue.number,
    text: issue.title + ":" + issue.body
};
sgMail
    .send(msg)
    .then(function () { return console.log('Mail sent successfully'); })["catch"](function (error) { return console.error(error.toString()); });
