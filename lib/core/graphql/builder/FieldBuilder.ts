/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {EntityClass, getEntityMetadata} from '@inu-cafeteria/backend-core';
import {
  assertInputType,
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLNamedType,
  GraphQLType,
} from 'graphql/type/definition';
import {GraphQLInt, GraphQLList} from 'graphql';
import assert from 'assert';
import {logger} from '@inu-cafeteria/backend-core';
import GraphQLFieldArguments from './GraphQLFieldArguments';

export default class FieldBuilder {
  constructor(private readonly entity: EntityClass, private readonly types: GraphQLNamedType[]) {}

  private meta = getEntityMetadata(this.entity);

  private name = this.meta.name;
  private type = this.findType(this.name);
  private inputType = assertInputType(this.findType(this.name + 'Input'));

  buildQueryFields(): GraphQLFieldConfigMap<any, any> {
    const relations = getEntityMetadata(this.entity)
      .fields.filter((f) => f.relational)
      .map((f) => f.name);

    return this.buildField(`all${this.name}`, {
      type: new GraphQLList(this.type),
      args: GraphQLFieldArguments.queryArgs(),
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
      args: GraphQLFieldArguments.modifyArgs(this.inputType),
      resolve: async (_, {values}) => {
        logger.info(`${this.name}을(를) 저장! 값은 다음과 같음: ${JSON.stringify(values)}`);

        // 이렇게 엔티티 인스턴스를 만들어야 엔티티에 정의된 기본값이 들어감.
        const entity = this.entity.create(values);

        await this.entity.save(entity);

        logger.info(`변경된 ${this.name}은(는) 1개!`);

        return 1; // 사실 별 의미 없음. mutation 망하면 errors 필드에 에러 나갈거임.
      },
    });

    const removeField = this.buildField(`remove${this.name}`, {
      type: GraphQLInt,
      args: GraphQLFieldArguments.deleteArgs(),
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
