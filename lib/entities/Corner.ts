import {serializeObject} from '../utils/object';
import {camelToSnake} from '../utils/naming';
import IEntity from './base/IEntity';

class Corner implements IEntity {
  id: number = 0;
  name: string = '';
  displayName: string = '';
  availableAt: number = 0;

  cafeteriaId: number = 0;

  static type() {
    return `
        type Corner {
            id: Int!
            name: String!
            display_name: String!
            available_at: Int!
            cafeteria_id: Int!
        }
        `;
  }

  static input() {
    return `
        input CornerInput {
            id: Int!
            name: String
            display_name: String
            available_at: Int
            cafeteria_id: Int
        }
        `;
  }

  serialize() {
    return serializeObject(this, camelToSnake);
  }
}

export default Corner;
