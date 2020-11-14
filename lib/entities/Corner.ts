import {parseObject, serializeObject} from "../utils/object";
import {camelToSnake, snakeToCamel} from "../utils/naming";

class Corner {
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

    static parse(raw: any) {
        // @ts-ignore
        return parseObject(raw, snakeToCamel, Corner);
    }

    serialize() {
        return serializeObject(<Corner>this, camelToSnake);
    }
}

export default Corner;
