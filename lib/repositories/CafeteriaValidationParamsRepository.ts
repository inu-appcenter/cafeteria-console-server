import SequelizeCRUDRepository from "./base/SequelizeCRUDRepository";
import CafeteriaValidationParams from "../entities/CafeteriaValidationParams";
import CafeteriaValidationParamsModel from "../db/models/CafeteriaValidationParamsModel";

class CafeteriaValidationParamsRepository extends SequelizeCRUDRepository<CafeteriaValidationParams, CafeteriaValidationParamsModel> {

    constructor() {
        super(CafeteriaValidationParams, CafeteriaValidationParamsModel);
    }

    async addParams(params: CafeteriaValidationParams) {
        return this.create(params);
    }

    async getParams(cafeteriaId: number) {
        return this.read(cafeteriaId);
    }

    async getAllParams() {
        return this.readAll();
    }

    async updateParams(params: CafeteriaValidationParams) {
        return this.update(params);
    }

    async deleteParams(cafeteriaId: number) {
        return this.delete(cafeteriaId);
    }
}

const cafeteriaValidationParamsRepository = new CafeteriaValidationParamsRepository();

export default cafeteriaValidationParamsRepository;
