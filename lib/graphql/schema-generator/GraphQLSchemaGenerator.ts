import {EntityClass, getEntityMetadata} from '@inu-cafeteria/backend-core';
import {EntityMetadata} from '@inu-cafeteria/backend-core/dist/src/getEntityMetadata';
import SchemaBuilder from './schema/SchemaBuilder';
import {SchemaBuilderField} from './schema/Types';
import {capitalizeFirstLetter} from './utils/string';

/**
 * 고통과 절망의 노가다를 대신하기 위한 희망 속에서 태어난
 * GraphQL 스케마 자동 생성기입니다.
 *
 * 생성자에다가 데코레이터 찰싹 붙은 backend-core 엔티티를 집어넣어만 주면
 * CRUD 다 커버하는 스케마가 생깁니다! 야호~
 */
export default class GraphQLSchemaGenerator {
  constructor(private readonly entityClasses: EntityClass[]) {}

  /**
   * 엔티티 타입 정의를 모두 만들어 가져옵니다.
   */
  types(): string {
    return this.entityClasses.map((e) => this.entityType(getEntityMetadata(e))).join(`\n\n`);
  }

  /**
   * 엔티티 입력 객체 정의를 모두 만들어 가져옵니다.
   */
  inputs(): string {
    return this.entityClasses.map((e) => this.entityInput(getEntityMetadata(e))).join(`\n\n`);
  }

  /**
   * 엔티티에 관련된 조회 함수 정의를 모두 만들어 가져옵니다.
   *
   * @param extras backed-core 엔티티 이외에 무언가를 추가하고 싶을 때에 쓰세요.
   */
  query(...extras: string[]) {
    const builder = new SchemaBuilder({type: 'type', name: 'Query', extras});

    for (const entity of this.entityClasses) {
      const meta = getEntityMetadata(entity);
      const entityName = capitalizeFirstLetter(meta.name);

      builder.field(`all${entityName}`, `[${entityName}]`);
    }

    return builder.build();
  }

  /**
   * 엔티티에 관련된 생성, 업데이트, 삭제 함수 정의를 모두 만들어 가져옵니다.
   *
   * @param extras backed-core 엔티티 이외에 무언가를 추가하고 싶을 때에 쓰세요.
   */
  mutation(...extras: string[]) {
    const builder = new SchemaBuilder({type: 'type', name: 'Mutation', extras});

    for (const entity of this.entityClasses) {
      const meta = getEntityMetadata(entity);
      const entityName = capitalizeFirstLetter(meta.name);
      const lowerCasedEntityName = entityName.toLowerCase();

      const modifyParams = [{name: lowerCasedEntityName, type: `${entityName}Input`}];
      const deleteParams = [{name: `${lowerCasedEntityName}Id`, type: `Int`}];

      builder.fun(`create${entityName}`, modifyParams, 'Int');
      builder.fun(`update${entityName}`, modifyParams, `Int`);
      builder.fun(`delete${entityName}`, deleteParams, `Int`);
    }

    return builder.build();
  }

  /**
   * Query와 Mutation 실제 함수를 만들어 내보냅니다.
   * 엔티티가 Cafeteria, Corner 이런게 있다면
   *
   * {
   *    allCafeteria: [Function (anonymous)],
   *    createCafeteria: [Function (anonymous)],
   *    updateCafeteria: [Function (anonymous)],
   *    deleteCafeteria: [Function (anonymous)],
   *    allCorner: [Function (anonymous)],
   *    createCorner: [Function (anonymous)],
   *    updateCorner: [Function (anonymous)],
   *    deleteCorner: [Function (anonymous)]
   * }
   *
   * 이런 객체를 만들어준다 이말입니다.
   */
  rootValue() {
    const functions: any = {};

    for (const entity of this.entityClasses) {
      const meta = getEntityMetadata(entity);
      const entityName = capitalizeFirstLetter(meta.name);
      const lowerCasedEntityName = entityName.toLowerCase();

      functions[`all${entityName}`] = async () => {
        return await entity.find();
      };

      functions[`create${entityName}`] = async (params: any) => {
        const entityInit = params[lowerCasedEntityName];

        const {length} = await entity.save(entityInit);

        return length;
      };

      functions[`update${entityName}`] = async (params: any) => {
        const entityInit = params[lowerCasedEntityName];

        const {length} = await entity.save(entityInit);

        return length;
      };

      functions[`delete${entityName}`] = async (params: any) => {
        const entityId = params[`${lowerCasedEntityName}Id`];

        const {affected} = await entity.delete(entityId);

        return affected;
      };
    }

    return functions;
  }

  private entityType(meta: EntityMetadata) {
    return new SchemaBuilder({
      type: 'type',
      name: capitalizeFirstLetter(meta.name),
      fields: this.parseFields(meta),
    }).build();
  }

  private entityInput(meta: EntityMetadata) {
    return new SchemaBuilder({
      type: 'input',
      name: `${capitalizeFirstLetter(meta.name)}Input`,
      fields: this.parseFields(meta),
    }).build();
  }

  private parseFields(meta: EntityMetadata): SchemaBuilderField[] {
    return meta.fields.map((f) => ({
      name: f.name,
      type: this.toGraphqlType(f.type) + (f.nullable ? '' : '!'),
    }));
  }

  private toGraphqlType(jsType: string) {
    const conversion: Record<string, string> = {
      String: 'String',
      Number: 'Int',
      Boolean: 'Boolean',
      Date: 'Date',
      text: 'String',
      datetime: 'Date',
    };

    if (conversion[jsType]) {
      return conversion[jsType];
    } else {
      console.warn(`처음 보는 타입: ${jsType}. 해결하세욧!`);
      return jsType;
    }
  }
}
