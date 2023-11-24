/**
 * Configuration file for setting up the nodemailer transporter and default email options.
 * This file configures the email transporter using environment variables and sets default values
 * for various email options. It's designed to streamline the process of sending emails
 * through the application.
 */

'use strict';

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Creates a transporter object using nodemailer with SMTP server details.
// SMTP configuration is fetched from environment variables.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.innovateapparel.com', // SMTP server host
  port: +process.env.SMTP_PORT || 25, // SMTP server port, converted to a number
  secure: process.env.SMTP_SECURE || true, // Boolean indicating if SSL is used
  auth: {
    user: process.env.SMTP_USERNAME || 'invalid@innovateapparel.com', // SMTP authentication username
    pass: process.env.SMTP_PASSWORD || '', // SMTP authentication password
  },
});

// Default "From" email address used for sending emails.
const DEFAULT_FROM = process.env.DEFAULT_FROM || 'no-reply@innovateapparel.com';

// Default subject line for emails. Falls back to 'Automated Test Email' if not set in environment.
const DEFAULT_SUBJECT = process.env.DEFAULT_SUBJECT || 'Automated Test Email';

// Default recipient email address. Falls back to 'no-reply@innovateapparel.com' if not set.
const DEFAULT_TO = process.env.DEFAULT_TO || 'no-reply@innovateapparel.com';

// Default text content for emails. Falls back to 'Automated Test' if not set in environment.
const DEFAULT_TEXT = process.env.DEFAULT_TEXT || 'Automated Test';

// Default HTML content for emails. Falls back to '<h1>Automated Test</h1>' if not set.
const DEFAULT_HTML = process.env.DEFAULT_HTML || '<h1>Automated Test</h1>';

// Default email options that can be used for sending basic emails.
const DEFAULT_OPTIONS = {
  from: DEFAULT_FROM,
  to: DEFAULT_TO,
  subject: DEFAULT_SUBJECT,
  text: DEFAULT_TEXT,
  html: DEFAULT_HTML,
};

// Exporting the transporter and default configuration options for use in other parts of the application.
module.exports = {
  transporter,
  DEFAULT_FROM,
  DEFAULT_OPTIONS,
};
