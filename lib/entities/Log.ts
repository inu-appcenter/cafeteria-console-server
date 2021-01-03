import IEntity from "./base/IEntity";

class Log implements IEntity {
    get id(): number { // Primary key
        return this.timestamp;
    }

    timestamp: number = 0;
    message: string = '';

    serialize() {
        return {
            timestamp: this.timestamp.toString(), // GraphQL cannot afford long int.
            message: this.message
        };
    }

    static type() {
        return `
        type Log {
            timestamp: String!
            message: String!
        }
        `;
    }
}

export default Log;
