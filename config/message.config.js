/**
 * Configuration file for the message service.
 * This file loads environment variables and sets default values for various configuration options
 * used in the email sending process. It configures logo details and template paths for email contents.
 *
 * Environment variables can be set to override these defaults as needed.
 */

'use strict';

const dotenv = require('dotenv');
dotenv.config();

// LOGO_FILENAME: Filename of the company logo to be attached to emails.
// Defaults to 'logo.png' if not specified in environment variables.
const LOGO_FILENAME = process.env.LOGO_FILENAME || 'logo.png';

// LOGO_TYPE: The type or category of the logo, usually indicating its directory.
// Defaults to 'images' if not specified in environment variables.
const LOGO_TYPE = process.env.LOGO_TYPE || 'images';

// LOGO_CID: The Content-ID for the logo used in the HTML email for embedding images.
// Defaults to 'logo' if not specified in environment variables.
const LOGO_CID = process.env.LOGO_CID || 'logo';

// CODE_TEMPLATE: The filename of the HTML template used for verification code emails.
// Defaults to 'verification-code.html' if not specified in environment variables.
const CODE_TEMPLATE = process.env.CODE_TEMPLATE || 'verification-code.html';

// TEXT_TEMPLATE: The text template for emails, with placeholder for the verification code.
// Defaults to 'One-Time code: {{code}}' if not specified in environment variables.
const TEXT_TEMPLATE = process.env.TEXT_TEMPLATE || `One-Time code: {{code}}`;

// Exporting the configuration constants for use in other parts of the application.
module.exports = {
  LOGO_FILENAME,
  LOGO_TYPE,
  LOGO_CID,
  CODE_TEMPLATE,
  TEXT_TEMPLATE,
};
