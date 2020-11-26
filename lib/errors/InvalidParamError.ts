class InvalidParamError extends Error {
    constructor() {
        super(InvalidParamError.message);
    }

    static message = 'INVALID_PARAM'
}

export default InvalidParamError
