import interactionRepository from "../repositories/InteractionRepository";
import Entity from "../utils/Entity";
import Answer from "../entities/Answer";

export async function allQuestions() {
    const all = await interactionRepository.getAllQuestions();

    return all.map((q) => q.serialize());
}

// @ts-ignore
export async function answerQuestion({questionId, answer}) {
    const parsed = Entity.parseFiltered(answer, Answer);

    return await interactionRepository.answerQuestion(questionId, parsed);
}

// @ts-ignore
export async function updateAnswer({questionId, answer}) {
    const parsed = Entity.parseFiltered(answer, Answer);

    return await interactionRepository.updateAnswer(questionId, parsed);
}
