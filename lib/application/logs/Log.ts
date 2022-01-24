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

import GraphQLDate from '../../core/graphql/builder/GraphQLDate';
import logRepository from './LogRepository';
import {GraphQLFieldConfigMap, GraphQLNamedType} from 'graphql/type/definition';
import {GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import GraphQLFieldArguments from '../../core/graphql/builder/GraphQLFieldArguments';

export default class Log {
  message: string;
  timestamp: Date;

  static create(properties: Partial<Log>): Log {
    return Object.assign(new Log(), properties);
  }

  static type: GraphQLNamedType = new GraphQLObjectType({
    name: 'Log',
    fields: {
      message: {
        type: new GraphQLNonNull(GraphQLString),
        description: '로그 본문',
      },
      timestamp: {
        type: new GraphQLNonNull(GraphQLDate),
        description: '로그 발생 일시',
      },
    },
  });

  static query: GraphQLFieldConfigMap<any, any> = {
    // 이름은 allXX로 맞췄지만 실은 최근 것만 가져옴..!
    allLog: {
      type: new GraphQLList(Log.type),
      args: GraphQLFieldArguments.queryArgs(),
      resolve: async () => {
        // Argument는 무시하고, 지난 24시간 로그만 가져옵니다.
        return await Log.recentLog();
      },
      description: '최근 24시간 동안의 로그를 가져옵니다.',
    },
  };

  static async recentLog() {
    return await logRepository.getAllLogsInPast24Hours();
  }
}
