import {Cafeteria, Corner, startTypeORM} from '@inu-cafeteria/backend-core';
import GraphQLGenerator from '../../../lib/graphql/GraphQLGenerator';

beforeAll(async () => {
  // 이걸 해줘야 커넥션이 생기고 메타데이터도 생긴다...
  await startTypeORM();
});

describe('GraphQL 스케마를 자동으로 뽑아내보자!', () => {
  it('일단 돌려보자', async () => {
    const generator = new GraphQLGenerator([Cafeteria, Corner]);

    console.log(generator.types());
    console.log(generator.inputs());
    console.log(generator.query());
    console.log(generator.mutation());
  });
});
