import cafeteriaRepository from "../repositories/CafeteriaRepository";
import Cafeteria from "../entities/Cafeteria";

export async function allCafeteria() {
    const all = await cafeteriaRepository.getAllCafeteria();

    return all.map((cafeteria) => cafeteria.serialize());
}

// @ts-ignore
export async function createCafeteria({cafeteria}) {
    return await cafeteriaRepository.addCafeteria(Cafeteria.parse(cafeteria));
}

// @ts-ignore
export async function updateCafeteria({cafeteria}) {
    return await cafeteriaRepository.updateCafeteria(Cafeteria.parse(cafeteria));
}

// @ts-ignore
export async function deleteCafeteria({cafeteriaId}) {
    return await cafeteriaRepository.deleteCafeteria(cafeteriaId);
}
