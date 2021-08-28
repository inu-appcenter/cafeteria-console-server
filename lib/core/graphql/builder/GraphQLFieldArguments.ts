import {GraphQLFieldConfigArgumentMap, GraphQLInputType} from 'graphql/type/definition';
import {GraphQLInt, GraphQLString} from 'graphql';

const queryArgs: () => GraphQLFieldConfigArgumentMap = () => ({
  order: {type: GraphQLString, description: '정렬 순서(order). ASC 또는 DESC.'},
  offset: {type: GraphQLInt, description: '가져올 데이터의 오프셋(skip).'},
  limit: {type: GraphQLInt, description: '가져올 데이터의 갯수(take)'},
});

const modifyArgs: (type: GraphQLInputType) => GraphQLFieldConfigArgumentMap = (type) => ({
  values: {type, description: `엔티티의 값 객체`},
});

const deleteArgs: () => GraphQLFieldConfigArgumentMap = () => ({
  id: {type: GraphQLInt, description: `엔티티의 식별자`},
});

export default {
  queryArgs,
  modifyArgs,
  deleteArgs,
};
