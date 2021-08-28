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
