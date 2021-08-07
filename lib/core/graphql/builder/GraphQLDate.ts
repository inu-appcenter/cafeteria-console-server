import {GraphQLScalarType, Kind} from 'graphql';

export default new GraphQLScalarType({
  name: 'Date',
  description: '날짜를 밀리초 타임스탬프로 표현합니다.',
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null; // 정수가 아님!
  },
});
