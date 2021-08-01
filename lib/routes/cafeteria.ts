import cafeteriaRepository from '../repositories/CafeteriaRepository';
import Cafeteria from '../entities/Cafeteria';
import Entity from '../utils/Entity';

export async function allCafeteria() {
  const all = await cafeteriaRepository.getAllCafeteria();

  return all.map((cafeteria) => cafeteria.serialize());
}

// @ts-ignore
export async function createCafeteria({cafeteria}) {
  return await cafeteriaRepository.addCafeteria(Entity.parse(cafeteria, Cafeteria));
}

// @ts-ignore
export async function updateCafeteria({cafeteria}) {
  return await cafeteriaRepository.updateCafeteria(Entity.parseFiltered(cafeteria, Cafeteria));
}

// @ts-ignore
export async function deleteCafeteria({cafeteriaId}) {
  return await cafeteriaRepository.deleteCafeteria(cafeteriaId);
}
