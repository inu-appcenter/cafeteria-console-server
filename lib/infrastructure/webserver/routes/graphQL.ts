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

import {
  User,
  Notice,
  Corner,
  Answer,
  Question,
  Cafeteria,
  CheckInRule,
  DiscountRule,
  MenuParseRegex,
  DiscountTransaction,
  DiscountProcessHistory,
  CafeteriaBookingParams,
  CafeteriaValidationParams,
  CafeteriaDayOff,
  BookingTimeRange,
} from '@inu-cafeteria/backend-core';
import Log from '../../../application/logs/Log';
import {logger} from '@inu-cafeteria/backend-core';
import {graphqlHTTP} from 'express-graphql';
import {GraphQLError} from 'graphql';
import InvalidParamError from '../../../core/graphql/errors/InvalidParamError';
import GraphQLSchemaBuilder, {
  SchemaExtra,
} from '../../../core/graphql/builder/GraphQLSchemaBuilder';

const entities = [
  User,
  Corner,
  Notice,
  Answer,
  Question,
  Cafeteria,
  CheckInRule,
  DiscountRule,
  MenuParseRegex,
  CafeteriaDayOff,
  BookingTimeRange,
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
