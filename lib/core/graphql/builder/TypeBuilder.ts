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
  GraphQLNamedType,
} from 'graphql/type/definition';
import GraphQLDate from './GraphQLDate';
import assert from 'assert';

/**
 * 전방 선언은 지원하지만 순환 참조는 지원 안 함!
 */
export default class TypeBuilder {
  constructor(private readonly allMetadata: EntityMetadata[]) {}

  private types: GraphQLNamedType[] = [];
  private inputTypes: GraphQLNamedType[] = [];

  buildTypes(): GraphQLNamedType[] {
    for (const m of this.allMetadata) {
      this.buildAndSaveType(m);
    }

    return [...this.types, ...this.inputTypes];
  }

  private buildAndSaveType(metadata: EntityMetadata): GraphQLNamedType {
    const fieldsThunk = () => this.buildFields(metadata).fields;
    const inputFieldsThunk = () => this.buildFields(metadata).inputFields;

    const type = new GraphQLObjectType({
      name: metadata.name,
      fields: fieldsThunk,
    });
    const inputType = new GraphQLInputObjectType({
      name: metadata.name + 'Input',
      fields: inputFieldsThunk,
    });

    this.types.push(type);
    this.inputTypes.push(inputType);

    return type;
  }

  private buildFields(metadata: EntityMetadata) {
    const fields: GraphQLFieldConfigMap<any, any> = {};
    const inputFields: GraphQLInputFieldConfigMap = {};

    for (const f of metadata.fields) {
      const t = this.resolveType(f.type);

      const fieldConfig = {
        type: f.nullable ? t : new GraphQLNonNull(t),
        description: f.comment,
      };

      fields[f.name] = fieldConfig as any;
      if (!f.relational) {
        inputFields[f.name] = fieldConfig as any;
      }
    }

    return {fields, inputFields};
  }

  private resolveType(type: string) {
    const maybeDefaultType = this.graphQLScalarType(type);

    if (maybeDefaultType) {
      return maybeDefaultType;
    } else {
      return this.getOrCreateType(type);
    }
  }

  private graphQLScalarType(type: string): GraphQLScalarType | undefined {
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

  private getOrCreateType(type: string) {
    const alreadyBuilt = this.getAlreadyBuiltType(type);

    if (alreadyBuilt) {
      return alreadyBuilt;
    } else {
      return this.createAndSaveType(type);
    }
  }

  private getAlreadyBuiltType(type: String) {
    return this.types.find((t) => t.name === type);
  }

  private createAndSaveType(type: String) {
    const metaOfTypeWeNeed = this.allMetadata.find((m) => m.name === type);

    assert(metaOfTypeWeNeed, `${type} 타입이 필요한데 아무리 찾아도 없어요! 넘겨는 주셨나요??`);

    return this.buildAndSaveType(metaOfTypeWeNeed);
  }
}
