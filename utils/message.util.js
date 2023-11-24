const fs = require('fs');
const path = require('path');
const { utilLogger } = require('../config/logging.config');
const { InternalServerError } = require('../config/errors.config');

/**
 * Generates a random 6-digit verification code as a string.
 *
 * @returns {string} A 6-digit verification code.
 */
const generateVerificationCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
  return code.toString();
};

/**
 * Loads an email template from the file system.
 *
 * @param {string} templateName - The name of the template file to load.
 * @returns {string} The contents of the template file as a string.
 */
const loadTemplate = (templateName) => {
  try {
    const templatePath = path.join(__dirname, '../templates', templateName);
    return fs.readFileSync(templatePath, 'utf8');
  } catch (err) {
    utilLogger.error({
      level: 'error',
      message: `Error loading template (${templateName}): ${err.message}`,
    });
    throw new InternalServerError(`Failed to load template: ${templateName}`);
  }
};

/**
 * Creates an attachment object for use in an email.
 *
 * @param {string} attachmentType - The directory type of the attachment.
 * @param {string} attachmentName - The filename of the attachment.
 * @param {string} attachmentCID - The Content-ID for embedding the attachment in the email.
 * @returns {Object} An object representing the email attachment.
 */
const loadAttachment = (attachmentType, attachmentName, attachmentCID) => {
  try {
    const attachmentDir = path.resolve(__dirname, '..', attachmentType);
    const attachmentPath = path.join(attachmentDir, attachmentName);
    return {
      filename: attachmentName,
      path: attachmentPath,
      cid: attachmentCID,
    };
  } catch (err) {
    utilLogger.error({
      level: 'error',
      message: `Error loading attachment (${attachmentName}): ${err.message}`,
    });
    throw new InternalServerError(
      `Failed to load attachment: ${attachmentName}`
    );
  }
};

module.exports = {
  generateVerificationCode,
  loadTemplate,
  loadAttachment,
};
