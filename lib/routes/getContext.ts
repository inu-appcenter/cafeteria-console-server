import {defineSchema} from './libs/schema';
import {defineRoute} from './libs/route';
import {authorizer} from './middlewares/authorizer';
import GetCheckInContext from '../application/checkin/GetCheckInContext';

const schema = defineSchema({});

export default defineRoute('get', '/checkin/context', schema, authorizer, async (req, res) => {
  const context = await GetCheckInContext.run({cafeteriaId: 1}); // TODO

  return res.json(context);
});
