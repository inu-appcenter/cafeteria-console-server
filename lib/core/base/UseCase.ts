import {logger} from '@inu-cafeteria/backend-core';

export default abstract class UseCase<ParamT = void, ResultT = void> {
  async run(params: ParamT): Promise<ResultT> {
    logger.verbose(
      `UseCase '${this.constructor.name}'를 다음 인자로 실행합니다: ${JSON.stringify(params)}`
    );

    return await this.onExecute(params);
  }

  abstract onExecute(params: ParamT): Promise<ResultT>;
}
