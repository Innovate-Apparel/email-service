const { BadRequestError } = require('../config/errors.config');
const { sendVerificationCodeEmail } = require('../services/email.service');

/**
 * Controller to handle requests for sending a verification code email.
 * It extracts the recipient email and the verification code from the request body
 * and invokes the `sendVerificationCodeEmail` service to send the email.
 *
 * @param {Object} req - The request object from the client. Expected to contain
 *                       `recipient` and `code` in the request body.
 * @param {Object} res - The response object to send back the response.
 * @param {Function} next - The next middleware to be called in case of errors.
 *
 * @returns {Promise<Response>} - Sends a JSON response with the result of the email sending operation.
 *
 * @throws {BadRequestError} - Throws an error if `recipient` or `code` is not provided in the request body.
 */
const sendVerificationCode = async (req, res, next) => {
  try {
    const { recipient, code } = req.body;
    if (!recipient) throw new BadRequestError('Recipient Required!');
    if (!code) throw new BadRequestError('Verification Code Required!');

    const result = await sendVerificationCodeEmail(recipient, code);
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  sendVerificationCode,
};
