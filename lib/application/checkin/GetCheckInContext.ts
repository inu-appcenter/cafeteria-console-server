import UseCase from '../../core/base/UseCase';
import Context from './Context';

export type GetCheckInContextParams = {
  cafeteriaId?: number;
};

class GetCheckInContext extends UseCase<GetCheckInContextParams, Context> {
  async onExecute({cafeteriaId}: GetCheckInContextParams): Promise<Context> {
    return await Context.forNow(cafeteriaId || 1 /*TODO*/, new Date(/* '2021-08-23 08:31:00' */));
  }
}

export default new GetCheckInContext();
