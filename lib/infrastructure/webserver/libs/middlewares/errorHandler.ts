/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import express from 'express';
import {logger} from '@inu-cafeteria/backend-core';
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
