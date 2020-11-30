import IEntity from "./base/IEntity";
import {serializeObject} from "../utils/object";
import {camelToSnake} from "../utils/naming";

class Notice implements IEntity {
    id: number = 0;
    title: string = '';
    body: string = '';
    targetOs: string = '';
    targetVersion: string = '';

    serialize() {
        return serializeObject(this, camelToSnake);
    }

    static type() {
        return `
        type Notice {
            id: Int!
            title: String!
            body: String!
            target_os: String!
            target_version: String!
        }
        `;
    }

    static input() {
        return `
        input NoticeInput {
            id: Int!
            title: String!
            body: String!
            target_os: String!
            target_version: String!
        }
        `;
    }

}

export default Notice
