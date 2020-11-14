import {camelToSnake, snakeToCamel} from "../../lib/utils/naming";
import exp from "constants";

describe('Naming', () => {
   it('camel to snake with under bar', async () => {
       const before = 'helloWorldYeah';
       const expectation = 'hello_world_yeah';
       const result = camelToSnake(before);

       expect(result).toBe(expectation);
   });

   it('snake with under bar to camel', async () => {
      const before = 'do_you_know_gang_nam_style';
      const expectation = 'doYouKnowGangNamStyle';
      const result = snakeToCamel(before);

      expect(result).toBe(expectation);
   });
});

