import IEntity from "./base/IEntity";
import {serializeObject} from "../utils/object";
import {camelToSnake} from "../utils/naming";
import Answer from "./Answer";

class Question implements IEntity {
    id: number = 0;
    deviceInfo: string = '';
    version: string = '';
    content: string = '';
    userId: number = 0;
    date: Date = new Date();
    answer: Answer | null = null;

    serialize() {
        return serializeObject(this, camelToSnake);
    }

    static type() {
        return `
        type Question {
            id: Int!
            device_info: String!
            version: String!
            content: String!
            user_id: Int!
            date: String!
            answer: Answer
        }
        `;
    }
}

export default Question
