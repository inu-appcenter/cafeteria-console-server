import cornerRepository from '../repositories/CornerRepository';
import Corner from '../entities/Corner';
import Entity from '../utils/Entity';

export async function allCorners() {
  const all = await cornerRepository.getAllCorners();

  return all.map((corner) => corner.serialize());
}

// @ts-ignore
export async function createCorner({corner}) {
  return await cornerRepository.addCorner(Entity.parse(corner, Corner));
}

// @ts-ignore
export async function updateCorner({corner}) {
  return await cornerRepository.updateCorner(Entity.parseFiltered(corner, Corner));
}

// @ts-ignore
export async function deleteCorner({cornerId}) {
  return await cornerRepository.deleteCorner(cornerId);
}
