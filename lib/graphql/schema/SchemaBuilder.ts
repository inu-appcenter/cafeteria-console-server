import {SchemaBuilderField, SchemaBuilderFunction} from './Types';

export type SchemaBuilderParams = {
  /**
   * 스케마의 타입.
   * type 아니면 input이에요.
   */
  type: string;

  /**
   * 스케마의 이름.
   * Query나 Mutation일 수도, 엔티티 이름일 수도 있습니다.
   * 기본적으로 대문자라고 가정합니다!
   */
  name: string;

  /**
   * 스케마의 필드들(함수 아닌거!).
   * 얘는 처음에 주어질 수도 있고, builder의 메소드를 통해서도 집어넣을 수 있어요.
   */
  fields?: SchemaBuilderField[];

  /**
   * 스케마의 함수들.
   * 얘는 처음에 주어질 수도 있고, builder의 메소드를 통해서도 집어넣을 수 있어요.
   */
  functions?: SchemaBuilderFunction[];
};

/**
 * GraphQL type 또는 input 선언을 생성합니다.
 * 그러니까 뭐 이런거죠:
 *
 * type User {
 *   필드: 타입!
 * }
 */
export default class SchemaBuilder {
  constructor(private readonly params: SchemaBuilderParams) {}

  private type = this.params.type;
  private name = this.params.name;
  private fields = this.params.fields || [];
  private functions = this.params.functions || [];

  /**
   * 필드를 추가합니다.
   */
  field(name: string, type: string) {
    this.fields.push({name, type});
  }

  /**
   * 함수를 추가합니다.
   */
  fun(name: string, params: SchemaBuilderField[], type: string) {
    this.functions.push({name, params, type});
  }

  /**
   * 스케마 스트링을 뽑아냅니다.
   */
  build(): string {
    const {type, name, fields, functions} = this;

    const lineOfFields = fields.map((f) => `${f.name}: ${f.type}`);

    const lineOfFunctions = functions.map((f) => {
      const parameters = f.params.map((p) => `${p.name}: ${p.type}`).join(', ');

      return `${f.name}(${parameters}): ${f.type}`;
    });

    const lines = [...lineOfFields, ...lineOfFunctions].map((l) => `\n\t${l}`).join('');

    return `${type} ${name} {${lines}\n}`;
  }
}
