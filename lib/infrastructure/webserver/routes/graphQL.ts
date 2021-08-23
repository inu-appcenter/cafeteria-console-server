import {
  User,
  Notice,
  Corner,
  Answer,
  Question,
  Cafeteria,
  DiscountRule,
  MenuParseRegex,
  DiscountTransaction,
  DiscountProcessHistory,
  CafeteriaBookingParams,
  CafeteriaValidationParams,
} from '@inu-cafeteria/backend-core';
import Log from '../../../core/logs/Log';
import logger from '../../../common/utils/logger';
import {graphqlHTTP} from 'express-graphql';
import {GraphQLError} from 'graphql';
import InvalidParamError from '../../../core/graphql/errors/InvalidParamError';
import GraphQLSchemaBuilder, {SchemaExtra} from '../../../core/graphql/builder/GraphQLSchemaBuilder';

const entities = [
  User,
  Corner,
  Notice,
  Answer,
  Question,
  Cafeteria,
  DiscountRule,
  MenuParseRegex,
  DiscountTransaction,
  DiscountProcessHistory,
  CafeteriaBookingParams,
  CafeteriaValidationParams,
];

/**
 * 로그 엔티티는 TypeORM으로 다루지 않으므로 별도로 취급!
 */
const extras: SchemaExtra = {
  types: [Log.type],
  queryFields: {...Log.query},
};

/**
 * GraphQL 라우터 에러 핸들러!
 */
function customFormatErrorFn(error: GraphQLError) {
  if (error.message === InvalidParamError.message) {
    logger.warn('오이!! 그런 잘못된 요청은 나를 화나게 한다구...?');
  } else {
    logger.error(error);
  }

  return error;
}

export default function graphQL() {
  const schema = new GraphQLSchemaBuilder(entities, extras).build();

  return graphqlHTTP({
    schema,
    customFormatErrorFn,
    graphiql: true,
  });
}
