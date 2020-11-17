import IEntity from "../entities/base/IEntity";
import {parseObject} from "./object";
import {snakeToCamel} from "./naming";

export default {
    parse<T extends IEntity>(raw: any, type: {new(): T}) {
        return parseObject(raw, snakeToCamel, type);
    },

    parseFiltered<T extends IEntity>(raw: any, type: {new(): T}) {
        return parseObject(raw, snakeToCamel, type, true);
    }
}
