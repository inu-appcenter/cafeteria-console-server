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
export default class GraphQLGenerator {
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
   * @param extra backed-core 엔티티 이외에 무언가를 추가하고 싶을 때에 쓰세요.
   */
  query(extra?: string[]) {
    const builder = new SchemaBuilder({type: 'type', name: 'Query'});

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
   * @param extra backed-core 엔티티 이외에 무언가를 추가하고 싶을 때에 쓰세요.
   */
  mutation(extra?: string[]) {
    const builder = new SchemaBuilder({type: 'type', name: 'Mutation'});

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
      type: this.primitiveTypeToGraphqlType(f.type) + (f.nullable ? '' : '!'),
    }));
  }

  private primitiveTypeToGraphqlType(jsType: string) {
    const conversion: Record<string, string> = {
      string: 'String',
      number: 'Int',
      boolean: 'Boolean',
    };

    if (conversion[jsType]) {
      return conversion[jsType];
    } else {
      return jsType;
    }
  }
}
