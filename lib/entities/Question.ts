import IEntity from "./base/IEntity";
import {serializeObject} from "../utils/object";
import {camelToSnake} from "../utils/naming";

class Question implements IEntity {
    id: number = 0;
    deviceInfo: string = '';
    version: string = '';
    content: string = '';
    userId: number = 0;

    serialize() {
        return serializeObject(this, camelToSnake);
    }

    static type() {
        return `
        type Question {
            id: Int
            device_info: String
            version: String
            content: String
            userId: Int
            answer: Answer
        }
        `;
    }
}

export default Question
