import IEntity from './base/IEntity';
import {serializeObject} from '../utils/object';
import {camelToSnake} from '../utils/naming';

class CafeteriaComment implements IEntity {
  cafeteriaId: number = 0;
  comment: string = '';

  get id(): number {
    // Primary key
    return this.cafeteriaId;
  }

  static type() {
    return `
        type CafeteriaComment {
            cafeteria_id: Int!
            comment: String!
        }
        `;
  }

  static input() {
    return `
        input CafeteriaCommentInput {
            cafeteria_id: Int!
            comment: String
        }
        `;
  }

  serialize() {
    return serializeObject(this, camelToSnake);
  }
}

export default CafeteriaComment;
