import GraphQLDate from '../graphql/builder/GraphQLDate';
import logRepository from './LogRepository';
import {GraphQLFieldConfigMap, GraphQLNamedType} from 'graphql/type/definition';
import {GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';

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
    recentLog: {
      type: new GraphQLList(Log.type),
      resolve: async () => {
        return await Log.recentLog();
      },
      description: '최근 24시간 동안의 로그를 가져옵니다.',
    },
  };

  static async recentLog() {
    return await logRepository.getAllLogsInPast24Hours();
  }
}
