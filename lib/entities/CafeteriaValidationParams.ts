import IEntity from './base/IEntity';
import {serializeObject} from '../utils/object';
import {camelToSnake} from '../utils/naming';

class CafeteriaValidationParams implements IEntity {
  cafeteriaId: number = 0; // Foreign key
  token: string = '';
  availableMealTypes: number = 0;
  timeRangeBreakfast: string = '';
  timeRangeLunch: string = '';
  timeRangeDinner: string = '';

  get id(): number {
    // Primary key
    return this.cafeteriaId;
  }

  static type() {
    return `
        type CafeteriaValidationParams {
            cafeteria_id: Int!
            token: String!
            available_meal_types: Int!
            time_range_breakfast: String!
            time_range_lunch: String!
            time_range_dinner: String!
        }
        `;
  }

  static input() {
    return `
        input CafeteriaValidationParamsInput {
            cafeteria_id: Int!
            token: String
            available_meal_types: Int
            time_range_breakfast: String
            time_range_lunch: String
            time_range_dinner: String
        }
        `;
  }

  serialize() {
    return serializeObject(this, camelToSnake);
  }
}

export default CafeteriaValidationParams;
