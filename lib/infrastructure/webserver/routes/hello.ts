import packageInfo from '../../../../package.json';
import {defineRoute} from '../libs/route';
import {defineSchema} from '../libs/schema';

const schema = defineSchema({});

export default defineRoute('get', '/', schema, async (req, res) => {
  res.send(
    `카페테리아 콘솔 API 서버 v${packageInfo.version} 
    / 서버시각 ${new Date().toLocaleString()} 
    / 비상연락 010-2922-2661(앱센터 송병준) 
    / 오이! 여긴 어떻게 알았냐구!`
  );
});
