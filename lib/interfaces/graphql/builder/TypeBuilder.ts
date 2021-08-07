import {EntityMetadata} from '@inu-cafeteria/backend-core';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
} from 'graphql';
import {
  GraphQLFieldConfigMap,
  GraphQLInputFieldConfigMap,
  GraphQLInputObjectType,
} from 'graphql/type/definition';
import GraphQLDate from './GraphQLDate';

export default class TypeBuilder {
  constructor(private readonly meta: EntityMetadata) {}

  buildTypes(): [GraphQLObjectType, GraphQLInputObjectType] {
    const fields: GraphQLFieldConfigMap<any, any> = {};
    const inputFields: GraphQLInputFieldConfigMap = {};

    for (const f of this.meta.fields) {
      const t = this.graphQLTypeOf(f.type);

      fields[f.name] = inputFields[f.name] = {
        type: f.nullable ? t : new GraphQLNonNull(t),
        description: f.comment,
      };
    }

    return [
      new GraphQLObjectType({
        name: this.meta.name,
        fields: fields,
      }),
      new GraphQLInputObjectType({
        name: this.meta.name + 'Input',
        fields: inputFields,
      }),
    ];
  }

  private graphQLTypeOf(type: string) {
    const conversion: Record<string, GraphQLScalarType> = {
      String: GraphQLString,
      Number: GraphQLInt,
      Boolean: GraphQLBoolean,
      Date: GraphQLDate,
      text: GraphQLString,
      datetime: GraphQLDate,
    };

    return conversion[type];
  }
}
