import IEntity from './base/IEntity';
import {serializeObject} from '../utils/object';
import {camelToSnake} from '../utils/naming';

class TransactionHistory implements IEntity {
  id: number = 0;

  type: string = '';
  userId: number = 0;
  cafeteriaId: number = 0;
  mealType: number = -1;
  failedAt: number = 0;
  message: string = '';
  timestamp: Date = new Date();

  static type() {
    return `
        type TransactionHistory {
            id: Int!
            type: String!
            user_id: Int!
            cafeteria_id: Int!
            meal_type: Int!
            failed_at: Int!
            message: String!
            timestamp: String!
        }
        `;
  }

  serialize() {
    return serializeObject(this, camelToSnake);
  }
}

export default TransactionHistory;
