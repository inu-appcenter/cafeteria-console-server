import IEntity from './base/IEntity';
import {serializeObject} from '../utils/object';
import {camelToSnake} from '../utils/naming';

class AppVersionRule implements IEntity {
  id: number = 0;
  os: string = '';
  requiredMinimumVersion: string = '';

  static type() {
    return `
        type AppVersionRule {
            id: Int!
            os: String!
            required_minimum_version: String!
        }
        `;
  }

  static input() {
    return `
        input AppVersionRuleInput {
            id: Int!
            os: String!
            required_minimum_version: String!
        }
        `;
  }

  serialize() {
    return serializeObject(this, camelToSnake);
  }
}

export default AppVersionRule;
