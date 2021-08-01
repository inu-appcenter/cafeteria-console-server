import IEntity from './base/IEntity';
import {serializeObject} from '../utils/object';
import {camelToSnake} from '../utils/naming';

class CafeteriaKioskNumbers implements IEntity {
  cafeteriaId: number = 0;
  kioskNumbers: string = ''; // Comma joined

  get id(): number {
    // Primary key
    return this.cafeteriaId;
  }

  static type() {
    return `
        type CafeteriaKioskNumbers {
            cafeteria_id: Int!
            kiosk_numbers: String!
        }
        `;
  }

  static input() {
    return `
        input CafeteriaKioskNumbersInput {
            cafeteria_id: Int!
            kiosk_numbers: String
        }
        `;
  }

  serialize() {
    return serializeObject(this, camelToSnake);
  }
}

export default CafeteriaKioskNumbers;
