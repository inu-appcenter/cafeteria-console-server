import express from 'express';
import logger from '../../../../common/utils/logger';
import {AssertionError} from 'assert';
import HttpError from '../../../../common/errors/http/base/HttpError';
import {stringifyError} from '../../../../common/utils/error';

export const errorHandler: express.ErrorRequestHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    logger.info(`HTTP 에러가 발생했습니다: ${stringifyError(error)}`);

    return res.status(error.statusCode).json(error.responseBody);
  } else if (isAssertionError(error)) {
    logger.warn(`Assertion 에러가 발생했습니다: ${stringifyError(error)}`);

    const {message} = error;

    return res.status(500).json({
      statusCode: 500,
      error: 'assertion_failed',
      message,
    });
  } else {
    logger.error(`처리되지 않은 에러가 발생했습니다: ${stringifyError(error)}`);

    return res.status(500).json({
      statusCode: 500,
      error: 'unhandled',
      message: stringifyError(error),
    });
  }
};

function isHttpError(error: Error): error is HttpError {
  return error instanceof HttpError;
}

function isAssertionError(error: Error): error is AssertionError {
  return error instanceof AssertionError;
}
