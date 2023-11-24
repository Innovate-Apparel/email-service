'use strict';

// External Dependencies
const express = require('express');
const cors = require('cors');
// Configurations
const { NotFoundError } = require('./config/errors.config');
const { appLogger } = require('./config/logging.config');
// Routes
const emailRoutes = require('./routes/email.route');

const app = express();

app.use(express.json());
app.use(cors());
app.use(appLogger);

app.use('/email', emailRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
