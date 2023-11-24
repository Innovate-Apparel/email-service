const { DEFAULT_OPTIONS } = require('../config/email.config');
const {
  LOGO_TYPE,
  LOGO_FILENAME,
  LOGO_CID,
  CODE_TEMPLATE,
  TEXT_TEMPLATE,
} = require('../config/message.config');
const {
  loadTemplate,
  loadAttachment,
  generateVerificationCode,
} = require('../utils/message.util');

/**
 * Crafts an email with the specified subject, recipients, and template.
 * This function loads the specified email template and prepares the email
 * options including attachments like the company logo.
 *
 * @param {string} subject - The subject line for the email.
 * @param {string | string[]} recipients - A single recipient or an array of recipients' email addresses.
 * @param {string} emailTemplate - The name of the email template file to be used.
 * @returns {Object} An object containing the loaded email template and the email options.
 *
 * Usage example:
 * const emailData = craftDefaultEmail('Welcome to Innovate Apparel', 'user@example.com', 'welcomeTemplate.html');
 * sendEmail(emailData.options, emailData.template);
 */
const craftDefaultEmail = (subject, recipients, emailTemplate) => {
  const logoAttachment = loadAttachment(LOGO_TYPE, LOGO_FILENAME, LOGO_CID);

  const options = {
    ...DEFAULT_OPTIONS,
    to: recipients,
    subject: subject,
    attachments: [logoAttachment],
  };

  let template;
  if (!emailTemplate) template = 'Auto Email to {{user}}';
  else template = loadTemplate(emailTemplate);

  return { template, options };
};

/**
 * Sends a verification code email to the specified recipient.
 * @param {string} to - Recipient's email address.
 * @param {string} user - User's name to personalize the email.
 */
const craftVerificationCodeEmailOptions = (recipients, code) => {
  if (!recipients) return null;

  const subject = 'Verify your Innovate Apparel Account';
  const user = recipients[0];

  let { template, options } = craftDefaultEmail(
    subject,
    recipients,
    CODE_TEMPLATE
  );

  if (!template || !options) return DEFAULT_OPTIONS;

  // Replace placeholders in the templates
  let text = TEXT_TEMPLATE;
  const html = template
    .replaceAll('{{user}}', user)
    .replaceAll('{{code}}', code);
  text = text.replaceAll('{{user}}', user).replaceAll('{{code}}', code);

  options = {
    ...options,
    text,
    html,
  };

  // console.log(options);

  return options;
};

module.exports = {
  craftVerificationCodeEmailOptions,
};
