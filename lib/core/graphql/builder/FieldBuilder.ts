import {EntityClass, getEntityMetadata} from '@inu-cafeteria/backend-core';
import {
  assertInputType,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldConfigMap,
  GraphQLNamedType,
  GraphQLType,
} from 'graphql/type/definition';
import {GraphQLInt, GraphQLList, GraphQLString} from 'graphql';
import assert from 'assert';

export default class FieldBuilder {
  constructor(private readonly entity: EntityClass, private readonly types: GraphQLNamedType[]) {}

  private meta = getEntityMetadata(this.entity);

  private name = this.meta.name;
  private type = this.findType(this.name);
  private inputType = assertInputType(this.findType(this.name + 'Input'));

  private queryArgs: GraphQLFieldConfigArgumentMap = {
    order: {type: GraphQLString, description: '정렬 순서'},
  };

  private modifyArgs: GraphQLFieldConfigArgumentMap = {
    values: {type: this.inputType, description: `${this.name} 값 객체`},
  };

  private deleteArgs: GraphQLFieldConfigArgumentMap = {
    id: {type: GraphQLInt, description: `${this.name}의 식별자`},
  };

  buildQueryFields(): GraphQLFieldConfigMap<any, any> {
    const relations = getEntityMetadata(this.entity)
      .fields.filter((f) => f.relational)
      .map((f) => f.name);

    return this.buildField(`all${this.name}`, {
      type: new GraphQLList(this.type),
      args: this.queryArgs,
      resolve: async (_, {order}) => {
        if (['ASC', 'DESC'].includes(order)) {
          return await this.entity.find({relations, order: {id: order}});
        } else {
          return await this.entity.find({relations});
        }
      },
      description: `${this.meta.name}을(를) 모두 가져옵니다.`,
    });
  }

  buildMutationFields(): GraphQLFieldConfigMap<any, any> {
    const saveField = this.buildField(`save${this.name}`, {
      type: GraphQLInt,
      args: this.modifyArgs,
      resolve: async (_, {values}) => {
        const {length} = await this.entity.save(values);

        return length;
      },
    });

    const removeField = this.buildField(`remove${this.name}`, {
      type: GraphQLInt,
      args: this.deleteArgs,
      resolve: async (_, {id}) => {
        const {affected} = await this.entity.delete(id);

        return affected;
      },
    });

    return {...saveField, ...removeField};
  }

  private buildField(
    fieldName: string,
    config: GraphQLFieldConfig<any, any>
  ): GraphQLFieldConfigMap<any, any> {
    return {
      [fieldName]: config,
    };
  }

  private findType(typeName: string): GraphQLType {
    const found = this.types.find((t) => t.name === typeName);

    assert(found, `${typeName}에 해당하는 GraphQL 타입이 정의되어 있어야 합니다.`);

    return found;
  }
}
