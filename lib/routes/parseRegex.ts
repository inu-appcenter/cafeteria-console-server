import parseRegexRepository from "../repositories/ParseRegexRepository";
import Entity from "../utils/Entity";
import ParseRegex from "../entities/ParseRegex";

export async function allParseRegexes() {
    const all = await parseRegexRepository.getAllParseRegexes();

    return all.map((regex) => regex.serialize());
}

// @ts-ignore
export async function createParseRegex({params}) {
    return await parseRegexRepository.addParseRegex(Entity.parse(params, ParseRegex));
}

// @ts-ignore
export async function updateParseRegex({params}) {
    return await parseRegexRepository.updateParseRegex(Entity.parseFiltered(params, ParseRegex));
}

// @ts-ignore
export async function deleteParseRegex({cafeteriaId}) {
    return await parseRegexRepository.deleteParseRegex(cafeteriaId);
}
