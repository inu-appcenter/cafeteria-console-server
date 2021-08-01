import IEntity from './base/IEntity';
import {serializeObject} from '../utils/object';
import {camelToSnake} from '../utils/naming';

class Answer implements IEntity {
  id: number = 0;
  title: string = '';
  body: string = '';
  read: boolean = false;
  date: Date = new Date();

  static type() {
    return `
        type Answer {
            id: Int!
            title: String!
            body: String!
            read: Boolean!
            date: String!
        }
        `;
  }

  static input() {
    return `
        input AnswerInput {
            title: String!
            body: String!
        }
        `;
  }

  serialize() {
    return serializeObject(this, camelToSnake);
  }
}

export default Answer;
