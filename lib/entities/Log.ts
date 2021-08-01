import IEntity from './base/IEntity';

class Log implements IEntity {
  timestamp: number = 0;
  message: string = '';

  get id(): number {
    // Primary key
    return this.timestamp;
  }

  static type() {
    return `
        type Log {
            timestamp: String!
            message: String!
        }
        `;
  }

  serialize() {
    return {
      timestamp: this.timestamp.toString(), // GraphQL cannot afford long int.
      message: this.message,
    };
  }
}

export default Log;
