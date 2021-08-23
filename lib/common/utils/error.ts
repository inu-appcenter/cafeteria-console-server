import {serializeError} from 'serialize-error';

export function stringifyError(error: Error) {
  return JSON.stringify(serializeError(error));
}
