import {EntityClass, getEntityMetadata} from '@inu-cafeteria/backend-core';
import {
  assertInputType,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldConfigMap,
  GraphQLNamedType,
  GraphQLType,
} from 'graphql/type/definition';
import {GraphQLInt, GraphQLList} from 'graphql';
import assert from 'assert';

export default class FieldBuilder {
  constructor(private readonly entity: EntityClass, private readonly types: GraphQLNamedType[]) {}

  private meta = getEntityMetadata(this.entity);

  private type = this.findType(this.meta.name);
  private inputType = assertInputType(this.findType(this.meta.name + 'Input'));

  private modifyArgName = this.meta.name.toLowerCase();
  private modifyArgs: GraphQLFieldConfigArgumentMap = {
    [this.modifyArgName]: {type: this.inputType, description: `${this.meta.name} 값 객체`},
  };

  private deleteArgName = this.meta.name.toLowerCase() + 'Id';
  private deleteArgs: GraphQLFieldConfigArgumentMap = {
    [this.deleteArgName]: {type: GraphQLInt, description: `${this.meta.name}의 식별자`},
  };

  buildQueryFields(): GraphQLFieldConfigMap<any, any> {
    return this.buildField(`all${this.meta.name}`, {
      type: new GraphQLList(this.type),
      resolve: async () => {
        return await this.entity.find();
      },
      description: `${this.meta.name}을(를) 모두 가져옵니다.`,
    });
  }

  buildMutationFields(): GraphQLFieldConfigMap<any, any> {
    const createField = this.buildField(`create${this.meta.name}`, {
      type: GraphQLInt,
      args: this.modifyArgs,
      resolve: async (_, args) => {
        const entityInit = args[this.modifyArgName];

        const {length} = await this.entity.save(entityInit);

        return length;
      },
    });

    const updateField = this.buildField(`update${this.meta.name}`, {
      type: GraphQLInt,
      args: this.modifyArgs,
      resolve: async (_, args) => {
        const entityInit = args[this.modifyArgName];

        const {length} = await this.entity.save(entityInit);

        return length;
      },
    });

    const deleteField = this.buildField(`delete${this.meta.name}`, {
      type: GraphQLInt,
      args: this.deleteArgs,
      resolve: async (_, args) => {
        const entityId = args[this.deleteArgName];

        const {affected} = await this.entity.delete(entityId);

        return affected;
      },
    });

    return {...createField, ...updateField, ...deleteField};
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
