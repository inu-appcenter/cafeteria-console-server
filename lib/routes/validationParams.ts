import cafeteriaValidationParamsRepository from "../repositories/CafeteriaValidationParamsRepository";
import CafeteriaValidationParams from "../entities/CafeteriaValidationParams";
import Entity from "../utils/Entity";
import InvalidParamError from "../errors/InvalidParamError";
import logger from "../utils/logger";

export async function allValidationParams() {
    const all = await cafeteriaValidationParamsRepository.getAllParams();

    return all.map((param) => param.serialize());
}

// @ts-ignore
export async function createValidationParams({params}) {
    const parsed = Entity.parse(params, CafeteriaValidationParams);
    if (!validateValidationParams(parsed)) {
        throw new InvalidParamError();
    }

    return await cafeteriaValidationParamsRepository.addParams(parsed);
}

// @ts-ignore
export async function updateValidationParams({params}) {
    const parsed = Entity.parseFiltered(params, CafeteriaValidationParams);
    if (!validateValidationParams(parsed)) {
        throw new InvalidParamError();
    }

    return await cafeteriaValidationParamsRepository.updateParams(parsed);
}

// @ts-ignore
export async function deleteValidationParams({cafeteriaId}) {
    return await cafeteriaValidationParamsRepository.deleteParams(cafeteriaId);
}

function validateValidationParams(params: CafeteriaValidationParams) {
    const result = shouldBeValidTimeRangeString(params.timeRangeBreakfast) &&
        shouldBeValidTimeRangeString(params.timeRangeLunch) &&
        shouldBeValidTimeRangeString(params.timeRangeDinner);

    if (!result) {
        logger.warn(`이봐! 자네 지금 잘못된 인자를 던졌어! ${JSON.stringify(params)} 이게 말이 돼!?!?`);
    }

    return result;
}

function shouldBeValidTimeRangeString(timeRangeString: string) {
    return /^[0-2][0-9]:[0-5][0-9]-[0-2][0-9]:[0-5][0-9]$/.test(timeRangeString);
}
