import cafeteriaKioskNumbersRepository from "../repositories/CafeteriaKioskNumbersRepository";
import Entity from "../utils/Entity";
import CafeteriaKioskNumbers from "../entities/CafeteriaKioskNumbers";
import InvalidParamError from "../errors/InvalidParamError";
import logger from "../utils/logger";

export async function allCafeteriaKioskNumbers() {
    const all = await cafeteriaKioskNumbersRepository.getAllKioskNumbers();

    return all.map((numbers) => numbers.serialize());
}

// @ts-ignore
export async function createCafeteriaKioskNumbers({kioskNumbers}) {
    const parsed = Entity.parse(kioskNumbers, CafeteriaKioskNumbers);
    if (!validateKioskNumbers(parsed)) {
        throw new InvalidParamError();
    }

    return await cafeteriaKioskNumbersRepository.createKioskNumbers(parsed);
}

// @ts-ignore
export async function updateCafeteriaKioskNumbers({kioskNumbers}) {
    const parsed = Entity.parseFiltered(kioskNumbers, CafeteriaKioskNumbers);
    if (!validateKioskNumbers(parsed)) {
        throw new InvalidParamError();
    }

    return await cafeteriaKioskNumbersRepository.updateKioskNumbers(parsed);
}

// @ts-ignore
export async function deleteCafeteriaKioskNumbers({cafeteriaId}) {
    return await cafeteriaKioskNumbersRepository.deleteKioskNumbers(cafeteriaId);
}

function validateKioskNumbers(kioskNumbers: CafeteriaKioskNumbers) {
    const result = shouldBeCommaSeparatedNumbersString(kioskNumbers.kioskNumbers);

    if (!result) {
        logger.warn(`이봐! 자네 지금 잘못된 인자를 던졌어! ${JSON.stringify(kioskNumbers)} 이게 말이 돼!?!?`);
    }

    return result;
}

function shouldBeCommaSeparatedNumbersString(timeRangeString: string) {
    return /^[0-9]{1,4}( *, *[0-9]{1,4})*$/.test(timeRangeString);
}
