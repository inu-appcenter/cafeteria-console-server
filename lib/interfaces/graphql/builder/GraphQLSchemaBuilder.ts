import {EntityClass, getEntityMetadata} from '@inu-cafeteria/backend-core';
import {GraphQLFieldConfigMap, GraphQLNamedType} from 'graphql/type/definition';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import TypeBuilder from './TypeBuilder';
import FieldBuilder from './FieldBuilder';

export type SchemaExtra = {
  types?: GraphQLNamedType[];
  queryFields?: GraphQLFieldConfigMap<any, any>;
  mutationFields?: GraphQLFieldConfigMap<any, any>;
};

/**
 * 킹왕짱 TypeORM 메타데이터 -> GraphQL 스케마 생성기!
 */
export default class GraphQLSchemaBuilder {
  constructor(
    private readonly entityClasses: EntityClass[],
    private readonly extras?: SchemaExtra
  ) {}

  private metas = this.entityClasses.map((e) => getEntityMetadata(e));
  private types: GraphQLNamedType[] = [];

  build(): GraphQLSchema {
    return new GraphQLSchema({
      types: this.makeAndSaveTypes(),
      query: new GraphQLObjectType({
        name: 'Query',
        fields: this.makeQueryFields(),
      }),
      mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: this.makeMutationFields(),
      }),
    });
  }

  private makeAndSaveTypes(): GraphQLNamedType[] {
    const types = [
      ...this.metas.map((m) => new TypeBuilder(m).buildTypes()).flat(),
      ...(this.extras?.types || []),
    ];

    this.types = Array.from(types);

    return types;
  }

  private makeQueryFields(): GraphQLFieldConfigMap<any, any> {
    return {
      ...this.entityClasses
        .map((e) => new FieldBuilder(e, this.types).buildQueryFields())
        .reduce((acc, cur) => ({...acc, ...cur})),
      ...this.extras?.queryFields,
    };
  }

  private makeMutationFields(): GraphQLFieldConfigMap<any, any> {
    return {
      ...this.entityClasses
        .map((e) => new FieldBuilder(e, this.types).buildMutationFields())
        .reduce((acc, cur) => ({...acc, ...cur})),
      ...this.extras?.mutationFields,
    };
  }
}
