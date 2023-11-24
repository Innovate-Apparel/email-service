/**
 * Service for email-related operations.
 */

const { transporter, DEFAULT_OPTIONS } = require('../config/email.config.js');
const { InternalServerError } = require('../config/errors.config.js');
const { utilLogger } = require('../config/logging.config.js');
const { craftVerificationCodeEmailOptions } = require('./message.service.js');

/**
 * Sends an email with the given options.
 *
 * @param {Object} options - Email sending options including recipient, subject, body, etc.
 * @returns {Object} A success message object upon successful email dispatch.
 * @throws {InternalServerError} Throws an internal server error when email sending fails.
 */

const sendEmail = async (options = { ...DEFAULT_OPTIONS }) => {
  try {
    utilLogger.debug({
      level: 'debug',
      message: `Sending email with the following options: ${options}`,
    });
    await transporter.sendMail(options);
    utilLogger.info({ level: 'info', message: 'Email sent successfully' });
    return { message: 'Email sent successfully' };
  } catch (err) {
    utilLogger.error({ level: 'error', message: err.message });
    throw new InternalServerError('Failed to send email');
  }
};

/**
 * Sends a verification code email to a specified recipient.
 *
 * @param {string} recipient - The recipient's email address.
 * @param {string} code - The verification code to be sent.
 * @returns {Object} The result of the email sending operation.
 */
const sendVerificationCodeEmail = async (recipient, code) => {
  const options = craftVerificationCodeEmailOptions([recipient], code);
  const result = await sendEmail(options);
  return result;
};

module.exports = { sendVerificationCodeEmail };
