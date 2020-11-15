import cafeteriaValidationParamsRepository from "../repositories/CafeteriaValidationParamsRepository";
import CafeteriaValidationParams from "../entities/CafeteriaValidationParams";

export async function allValidationParams() {
    const all = await cafeteriaValidationParamsRepository.getAllParams();

    return all.map((param) => param.serialize());
}

// @ts-ignore
export async function createValidationParams({params}) {
    return await cafeteriaValidationParamsRepository.addParams(CafeteriaValidationParams.parse(params));
}

// @ts-ignore
export async function updateValidationParams({params}) {
    return await cafeteriaValidationParamsRepository.updateParams(CafeteriaValidationParams.parse(params));
}

// @ts-ignore
export async function deleteValidationParams({cafeteriaId}) {
    return await cafeteriaValidationParamsRepository.deleteParams(cafeteriaId);
}
