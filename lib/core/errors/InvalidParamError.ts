class InvalidParamError extends Error {
  static message = 'INVALID_PARAM';

  constructor() {
    super(InvalidParamError.message);
  }
}

export default InvalidParamError;
