import cornerRepository from "../repositories/CornerRepository";
import Corner from "../entities/Corner";

export async function allCorners() {
    const all = await cornerRepository.getAllCorners();

    return all.map((corner) => corner.serialize());
}

// @ts-ignore
export async function createCorner({corner}) {
    return await cornerRepository.addCorner(Corner.parse(corner));
}

// @ts-ignore
export async function updateCorner({corner}) {
    return await cornerRepository.updateCorner(Corner.parse(corner));
}

// @ts-ignore
export async function deleteCorner({cornerId}) {
    return await cornerRepository.deleteCorner(cornerId);
}
