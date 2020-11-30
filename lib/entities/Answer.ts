import IEntity from "./base/IEntity";
import {serializeObject} from "../utils/object";
import {camelToSnake} from "../utils/naming";

class Answer implements IEntity {
    id: number = 0;
    title: string = '';
    body: string = '';
    read: boolean = false;
    userId: number = 0;
    date: Date = new Date();

    serialize() {
        return serializeObject(this, camelToSnake);
    }

    static type() {
        return `
        type Answer {
            id: Int!
            title: String!
            body: String!
            read: Boolean!
            userId: Int!
            date: Date!
        }
        `;
    }

    static input() {
        return `
        input Answer {
            id: Int!
            title: String!
            body: String!
            read: Boolean!
            userId: Int!
            date: Date!
        }
        `;
    }
}

export default Answer
