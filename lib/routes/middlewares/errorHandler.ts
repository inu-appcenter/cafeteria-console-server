import express from 'express';
import logger from '../../utils/logger';

export const errorHandler: express.ErrorRequestHandler = (error, req, res, next) => {
  logger.info(`에러!: ${error.message}`);

  return res.json({
    message: error.message,
  });
};
