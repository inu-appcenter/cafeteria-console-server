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
