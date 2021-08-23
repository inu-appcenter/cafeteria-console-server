import {defineSchema} from '../libs/schema';
import {defineRoute} from '../libs/route';
import {authorizer} from '../libs/middlewares/authorizer';
import GetCheckInContext from '../../../application/checkin/GetCheckInContext';
import {stringAsInt} from '../../../common/utils/zodTypes';

const schema = defineSchema({
  query: {
    cafeteriaId: stringAsInt.optional(),
  },
});

export default defineRoute('get', '/checkin/context', schema, authorizer, async (req, res) => {
  const {cafeteriaId} = req.query;

  const context = await GetCheckInContext.run({cafeteriaId});

  return res.json(context);
});
