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
import logger from '../../../common/utils/logger';

export default class FieldBuilder {
  constructor(private readonly entity: EntityClass, private readonly types: GraphQLNamedType[]) {}

  private meta = getEntityMetadata(this.entity);

  private name = this.meta.name;
  private type = this.findType(this.name);
  private inputType = assertInputType(this.findType(this.name + 'Input'));

  private queryArgs: GraphQLFieldConfigArgumentMap = {
    order: {type: GraphQLString, description: '정렬 순서(order). ASC 또는 DESC.'},
    offset: {type: GraphQLInt, description: '가져올 데이터의 오프셋(skip).'},
    limit: {type: GraphQLInt, description: '가져올 데이터의 갯수(take)'},
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
      resolve: async (_, {order, offset, limit}) => {
        const options = {
          order: ['ASC', 'DESC'].includes(order) ? {id: order} : undefined,
          skip: offset,
          take: limit,
        };

        logger.info(`${this.name}을(를) 모두 겟! 옵션은: ${JSON.stringify(options)}`);

        const resolved = await this.entity.find({relations, ...options});

        logger.info(`가져온 ${this.name}은(는) ${resolved.length}개!`);

        return resolved;
      },
      description: `${this.meta.name}을(를) 모두 가져옵니다.`,
    });
  }

  buildMutationFields(): GraphQLFieldConfigMap<any, any> {
    const saveField = this.buildField(`save${this.name}`, {
      type: GraphQLInt,
      args: this.modifyArgs,
      resolve: async (_, {values}) => {
        logger.info(`${this.name}을(를) 저장!`);

        const {length} = await this.entity.save(values);

        logger.info(`집어넣은 ${this.name}은(는) ${length}개!`);

        return length;
      },
    });

    const removeField = this.buildField(`remove${this.name}`, {
      type: GraphQLInt,
      args: this.deleteArgs,
      resolve: async (_, {id}) => {
        logger.info(`${this.name}을(를) 삭제!`);

        const {affected} = await this.entity.delete(id);

        logger.info(`삭제된 ${this.name}은(는) ${affected}개!`);

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
