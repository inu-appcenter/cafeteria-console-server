import cafeteriaCommentRepository from "../repositories/CafeteriaCommentRepository";
import Entity from "../utils/Entity";
import CafeteriaComment from "../entities/CafeteriaComment";

export async function allCafeteriaComments() {
    const all = await cafeteriaCommentRepository.getAllCafeteriaComments();

    return all.map((comment) => comment.serialize());
}

// @ts-ignore
export async function createCafeteriaComment({comment}) {
    return await cafeteriaCommentRepository.createCafeteriaComment(Entity.parse(comment, CafeteriaComment));
}

// @ts-ignore
export async function updateCafeteriaComment({comment}) {
    return await cafeteriaCommentRepository.updateCafeteriaComment(Entity.parseFiltered(comment, CafeteriaComment));
}

// @ts-ignore
export async function deleteCafeteriaComment({cafeteriaId}) {
    return await cafeteriaCommentRepository.deleteCafeteriaComment(cafeteriaId);
}
