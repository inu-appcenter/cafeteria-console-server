import IEntity from './base/IEntity';
import {serializeObject} from '../utils/object';
import {camelToSnake} from '../utils/naming';

class DiscountTransaction implements IEntity {
  id: number = 0;

  userId: number = 0;
  cafeteriaId: number = 0;
  mealType: number = -1;
  timestamp: Date = new Date();

  serialize() {
    return serializeObject(this, camelToSnake);
  }
}

export default DiscountTransaction;
