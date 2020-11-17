import parseRegexRepository from "../repositories/ParseRegexRepository";
import Entity from "../utils/Entity";
import ParseRegex from "../entities/ParseRegex";

export async function allParseRegexes() {
    const all = await parseRegexRepository.getAllParseRegexes();

    return all.map((regex) => regex.escape().serialize());
}

// @ts-ignore
export async function createParseRegex({regex}) {
    return await parseRegexRepository.addParseRegex(Entity.parse(regex, ParseRegex).unescape());
}

// @ts-ignore
export async function updateParseRegex({regex}) {
    return await parseRegexRepository.updateParseRegex(Entity.parseFiltered(regex, ParseRegex).unescape());
}

// @ts-ignore
export async function deleteParseRegex({regexId}) {
    return await parseRegexRepository.deleteParseRegex(regexId);
}
