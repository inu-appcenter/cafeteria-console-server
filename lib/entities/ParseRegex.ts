import {serializeObject} from "../utils/object";
import {camelToSnake} from "../utils/naming";
import IEntity from "./base/IEntity";

class ParseRegex implements IEntity {
    id: number = 0;

    regex: string = '';

    serialize() {
        return serializeObject(this, camelToSnake);
    }

    static type() {
        return `
        type ParseRegex {
            id: Int!
            regex: String!
        }
        `;
    }

    static input() {
        return `
        input ParseRegexInput {
            id: Int!
            regex: String
        `;
    }
}

export default ParseRegex;
