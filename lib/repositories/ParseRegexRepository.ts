import SequelizeCRUDRepository from "./base/SequelizeCRUDRepository";
import ParseRegex from "../entities/ParseRegex";
import ParseRegexModel from "../db/models/ParseRegexModel";

class ParseRegexRepository extends SequelizeCRUDRepository<ParseRegex, ParseRegexModel> {

    constructor() {
        super(ParseRegex, ParseRegexModel);
    }

    async addParseRegex(parseRegex: ParseRegex) {
        return this.create(parseRegex);
    }

    async getParseRegex(parseRegexId: number) {
        return this.read(parseRegexId);
    }

    async getAllParseRegexes() {
        return await this.readAll();
    }

    async updateParseRegex(parseRegex: ParseRegex) {
        return this.update(parseRegex);
    }

    async deleteParseRegex(parseRegexId: number) {
        return this.delete(parseRegexId);
    }
}

const parseRegexRepository = new ParseRegexRepository();

export default parseRegexRepository
