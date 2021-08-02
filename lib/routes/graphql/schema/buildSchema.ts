import {GraphQLScalarType, buildSchema as buildSchemaOriginal, GraphQLSchema} from 'graphql';

/**
 * 스케마를 만드는데... 커스텀 스칼라 타입과 함께 만듭니다.
 *
 * @param source 원본.
 * @param customScalars 커스텀 스칼라 목록.
 */
export default function buildSchema(
  source: string,
  ...customScalars: GraphQLScalarType[]
): GraphQLSchema {
  const sourceWithScalarSDL = withScalarSDL(source, customScalars);

  const schema = buildSchemaOriginal(sourceWithScalarSDL);

  for (const scalar of customScalars) {
    addResolver(schema, scalar);
  }

  return schema;
}

function withScalarSDL(source: string, scalars: GraphQLScalarType[]) {
  const scalarDefinitions = scalars.map((s) => `scalar ${s.name}`).join('\n');

  return scalarDefinitions + '\n' + source;
}

function addResolver(schema: GraphQLSchema, scalar: GraphQLScalarType) {
  schema.getTypeMap()[scalar.name] = scalar;
}
