import {serializeObject} from "../utils/object";
import {camelToSnake} from "../utils/naming";
import IEntity from "./base/IEntity";

class Cafeteria implements IEntity {
    id: number = 0;

    name: string = '';
    displayName: string = '';
    imagePath: string = '';

    supportMenu: boolean = false;
    supportDiscount: boolean = false;
    supportNotification: boolean = false;

    serialize() {
        return serializeObject(this, camelToSnake, ['imagePath']);
    }

    static type() {
        return `
        type Cafeteria {
            id: Int!
            name: String!
            display_name: String!
            support_menu: Boolean!
            support_discount: Boolean!
            support_notification: Boolean!
        }
     `;
    }

    static input() {
        return `
        input CafeteriaInput {
            id: Int!
            name: String
            display_name: String
            support_menu: Boolean
            support_discount: Boolean
            support_notification: Boolean
        }
        `;
    }
}

export default Cafeteria;
