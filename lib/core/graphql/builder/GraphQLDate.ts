import {GraphQLScalarType, Kind} from 'graphql';

export default new GraphQLScalarType({
  name: 'Date',
  description: '날짜를 ISO 스트링으로 표현합니다.',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null; // 스트링이 아님!
  },
});
