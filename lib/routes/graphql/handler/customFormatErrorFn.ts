import {GraphQLError} from 'graphql';
import InvalidParamError from '../../../errors/InvalidParamError';
import logger from '../../../utils/logger';

export default function customFormatErrorFn(error: GraphQLError) {
  if (error.message === InvalidParamError.message) {
    logger.warn('오이!! 그런 잘못된 요청은 나를 화나게 한다구...?');
  } else {
    logger.error(error);
  }

  return error;
}
