import IEntity from "./base/IEntity";
import {serializeObject} from "../utils/object";
import {camelToSnake} from "../utils/naming";

class CafeteriaKioskNumbers implements IEntity {
    cafeteriaId: number = 0;
    get id(): number { // Primary key
        return this.cafeteriaId;
    }

    kioskNumbers: string = ''; // Comma joined

    serialize() {
        return serializeObject(this, camelToSnake);
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
}

export default CafeteriaKioskNumbers;
