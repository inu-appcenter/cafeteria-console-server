import {defineRoute} from './libs/route';
import {defineSchema} from './libs/schema';

const schema = defineSchema({});

export default defineRoute('get', '/', schema, async (req, res) => {
  res.send('오이! 여긴 어떻게 알았냐구!');
});
