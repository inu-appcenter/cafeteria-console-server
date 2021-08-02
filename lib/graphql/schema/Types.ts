/**
 * GraphQL 스케마를 만들 때에 사용할 필드 타입입니다.
 */
export type SchemaBuilderField = {
  name: string;
  type: string;
};

/**
 * GraphQL 스케마를 만들 때에 사용할 함수 타입입니다.
 */
export type SchemaBuilderFunction = {
  name: string;
  params: SchemaBuilderField[];
  type: string;
};
