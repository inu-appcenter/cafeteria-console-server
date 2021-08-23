import {defineSchema} from '../libs/schema';
import {z} from 'zod';
import {defineRoute} from '../libs/route';
import PerformCheckIn from '../../../application/checkin/PerformCheckIn';
import {authorizer} from '../libs/middlewares/authorizer';

const schema = defineSchema({
  body: {
    ticket: z.string(),
  },
});

export default defineRoute('post', '/checkin', schema, authorizer, async (req, res) => {
  const {ticket} = req.body;

  await PerformCheckIn.run({ticket});

  return res.send();
});
