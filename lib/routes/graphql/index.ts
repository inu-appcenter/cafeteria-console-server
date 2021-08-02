import {
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
  CafeteriaValidationParams,
} from '@inu-cafeteria/backend-core';

import DateScalar from './scalars/DateScalar';
import buildSchema from './schema/buildSchema';
import {graphqlHTTP} from 'express-graphql';
import customFormatErrorFn from './handler/customFormatErrorFn';
import GraphQLSchemaGenerator from '../../graphql/schema-generator/GraphQLSchemaGenerator';
import Log from '../../entities/Log';

const generator = new GraphQLSchemaGenerator([
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
  CafeteriaValidationParams,
]);

export default () => {
  const source = [
    Log.type(),
    generator.types(),
    generator.inputs(),
    generator.query(Log.query()),
    generator.mutation(),
  ].join(`\n`);

  const schema = buildSchema(source, DateScalar);
  const rootValue = {
    ...generator.rootValue(),
    recentLog: Log.recentLog,
  };

  return graphqlHTTP({
    schema,
    rootValue,
    customFormatErrorFn,
    graphiql: true,
  });
};
