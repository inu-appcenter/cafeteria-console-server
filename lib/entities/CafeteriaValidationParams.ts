import IEntity from "./base/IEntity";
import {parseObject, serializeObject} from "../utils/object";
import {camelToSnake, snakeToCamel} from "../utils/naming";

class CafeteriaValidationParams implements IEntity<CafeteriaValidationParams> {
    cafeteriaId: number = 0; // Foreign key
    get id(): number { // Primary key
        return this.cafeteriaId;
    }

    token: string = '';
    availableMealTypes: number = 0;

    timeRangeBreakfast: string = '';
    timeRangeLunch: string = '';
    timeRangeDinner: string = '';

    static parse(raw: any) {
        return parseObject(raw, snakeToCamel, CafeteriaValidationParams);
    }

    serialize() {
        return serializeObject(this, camelToSnake);
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
}

export default CafeteriaValidationParams;
