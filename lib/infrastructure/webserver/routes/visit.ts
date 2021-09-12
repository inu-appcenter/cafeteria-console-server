import {z} from 'zod';
import {authorizer} from '../libs/middlewares/authorizer';
import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';
import LeaveManualVisitRecord from '../../../application/visit/LeaveManualVisitRecord';

const schema = defineSchema({
  body: {
    studentId: z.string().optional(),
    phoneNumber: z.string().optional(),
    cafeteriaId: z.number(),
  },
});

export default defineRoute('post', '/visit', schema, authorizer, async (req, res) => {
  const {studentId, phoneNumber, cafeteriaId} = req.body;

  await LeaveManualVisitRecord.run({studentId, phoneNumber, cafeteriaId});

  return res.send();
});
