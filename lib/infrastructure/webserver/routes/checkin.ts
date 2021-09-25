import {z} from 'zod';
import {authorizer} from '../libs/middlewares/authorizer';
import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import PerformCheckIn from '../../../application/checkin/PerformCheckIn';

const schema = defineSchema({
  body: {
    ticket: z.string(),
    gracefulInTime: z.boolean().optional().default(false),
  },
});

export default defineRoute('post', '/checkin', schema, authorizer, async (req, res) => {
  const {ticket, gracefulInTime} = req.body;

  await PerformCheckIn.run({ticket, gracefulInTime});

  return res.send();
});
