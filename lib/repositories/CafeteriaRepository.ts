import CafeteriaModel from "../db/models/CafeteriaModel";
import sequelize from "../db/sequelize";
import {Repository} from "sequelize-typescript";
import {parseObject} from "../utils/object";
import {snakeToCamel} from "../utils/naming";
import Cafeteria from "../entities/Cafeteria";

class CafeteriaRepository {
    repo: Repository<CafeteriaModel>

    constructor() {
        this.repo = sequelize.getRepository(CafeteriaModel);
    }

    async getAllCafeteria(): Promise<Cafeteria[]> {
        const seqResults = await this.repo.findAll();

        return seqResults
            .map((seq: any) => seq.dataValues)
            .map((values: any) => Cafeteria.parse(values));
    }

    async updateCafeteria(cafeteria: CafeteriaModel): Promise<void> {
    }

    async deleteCafeteria(cafeteriaId: number): Promise<void> {

    }
}

const cafeteriaRepository = new CafeteriaRepository();

export default cafeteriaRepository;
