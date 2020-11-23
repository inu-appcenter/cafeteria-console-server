import IEntity from "./base/IEntity";
import {serializeObject} from "../utils/object";
import {camelToSnake} from "../utils/naming";

class TransactionHistory implements IEntity {
    id: number = 0;

    type: string = '';
    userId: number = 0;
    cafeteriaId: number = 0;
    mealType: number = -1;
    failedAt: number = 0;
    message: string = '';

    serialize() {
        return serializeObject(this, camelToSnake);
    }
}

export default TransactionHistory
