import {parseObject, serializeObject} from "../utils/object";
import {camelToSnake, snakeToCamel} from "../utils/naming";
import IEntity from "./base/IEntity";

class Corner implements IEntity<Corner> {
    id: number = 0;
    name: string = '';
    displayName: string = '';
    availableAt: number = 0;

    cafeteriaId: number = 0;

    static parse(raw: any) {
        return parseObject(raw, snakeToCamel, Corner);
    }

    serialize() {
        return serializeObject(this, camelToSnake);
    }

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
}

export default Corner;
