import IEntity from './base/IEntity';
import {serializeObject} from '../utils/object';
import {camelToSnake} from '../utils/naming';

class CafeteriaDiscountRule implements IEntity {
  id: number = 0; // Independent from cafeteria.

  name: string = '';
  description: string = '';

  enabled: boolean = false;

  static type() {
    return `
        type CafeteriaDiscountRule {
            id: Int!
            name: String!
            description: String!
            enabled: Boolean!
        }
        `;
  }

  static input() {
    return `
        input CafeteriaDiscountRuleInput {
            id: Int!
            enabled: Boolean
        }
        `;
  }

  serialize() {
    return serializeObject(this, camelToSnake);
  }
}

export default CafeteriaDiscountRule;
