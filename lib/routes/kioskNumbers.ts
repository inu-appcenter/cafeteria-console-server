import cafeteriaKioskNumbersRepository from "../repositories/CafeteriaKioskNumbersRepository";
import Entity from "../utils/Entity";
import CafeteriaKioskNumbers from "../entities/CafeteriaKioskNumbers";

export async function allCafeteriaKioskNumbers() {
    const all = await cafeteriaKioskNumbersRepository.getAllKioskNumbers();

    return all.map((numbers) => numbers.serialize());
}

// @ts-ignore
export async function createCafeteriaKioskNumbers({kioskNumbers}) {
    const parsed = Entity.parse(kioskNumbers, CafeteriaKioskNumbers);

    return await cafeteriaKioskNumbersRepository.createKioskNumbers(parsed);
}

// @ts-ignore
export async function updateCafeteriaKioskNumbers({kioskNumbers}) {
    const parsed = Entity.parseFiltered(kioskNumbers, CafeteriaKioskNumbers);

    return await cafeteriaKioskNumbersRepository.updateKioskNumbers(parsed);
}

// @ts-ignore
export async function deleteCafeteriaKioskNumbers({cafeteriaId}) {
    return await cafeteriaKioskNumbersRepository.deleteKioskNumbers(cafeteriaId);
}
