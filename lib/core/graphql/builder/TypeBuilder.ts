import {EntityMetadata} from '@inu-cafeteria/backend-core';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
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
 * 전방 선언도 순환 참조도 지원하는 킹왕짱 GraphQL 타입 빌더!
 *
 * 주의사항: 타입 이름이 식별자라 String이나 Date같은거 클래스 이름으로 쓰면 혼나요!
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
    const {name} = metadata;

    /**
     * 타입 간의 원형 의존성이 발생하는 경우가 있습니다.
     * 그래서 필드를 직접 명시하지 않고, 필드를 정의하는 함수(thunk)를 명시합니다.
     */
    const fieldsThunk = () => this.buildFields(metadata).fields;
    const inputFieldsThunk = () => this.buildFields(metadata).inputFields;

    const type = new GraphQLObjectType({
      name: name,
      fields: fieldsThunk,
    });

    const inputType = new GraphQLInputObjectType({
      name: name + 'Input',
      fields: inputFieldsThunk,
    });

    this.types.push(type);
    this.inputTypes.push(inputType);

    return type;
  }

  private buildFields(metadata: EntityMetadata) {
    const fields: GraphQLFieldConfigMap<any, any> = {};
    const inputFields: GraphQLInputFieldConfigMap = {};

    for (const field of metadata.fields) {
      const resolved = this.resolveType(field.type);
      const listOrNot = field.isMany ? new GraphQLList(resolved) : resolved;

      fields[field.name] = {
        type: field.nullable ? listOrNot : new GraphQLNonNull(listOrNot),
        description: field.comment,
      } as any;

      if (field.relational) {
        continue;
      }

      inputFields[field.name] = {
        // 처음 생성 당시 id(primary)는 null일 수 있기 때문에,
        // nullable 또는 primary이면 nullable 타입으로 선언.
        type: field.nullable || field.primary ? listOrNot : new GraphQLNonNull(listOrNot),
        description: field.comment,
      } as any;
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
