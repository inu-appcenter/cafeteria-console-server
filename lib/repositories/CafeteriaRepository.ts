import CafeteriaModel from "../db/models/CafeteriaModel";
import sequelize from "../db/sequelize";
import {Repository} from "sequelize-typescript";
import Cafeteria from "../entities/Cafeteria";
import logger from "../utils/logger";

class CafeteriaRepository {
    repo: Repository<CafeteriaModel>

    constructor() {
        this.repo = sequelize.getRepository(CafeteriaModel);
        logger.verbose(`5252 이봐 CafeteriaModel! 네놈 repo는 내가 처리하지!`);
    }

    async getAllCafeteria(): Promise<Cafeteria[]> {
        logger.verbose(`Cafeteria를 다 가져오라구? 킄.. 좋아 원하는대로 해주지`);

        const result = await this.repo.findAll()
            .map((seq: any) => seq.dataValues)
            .map((values: any) => Cafeteria.parse(values));

        logger.verbose(`무려 ${result.length}개나 겟또다제☆ 이제서야 만족스러운거냐구!`);

        return result;
    }

    async updateCafeteria(cafeteria: Cafeteria): Promise<void> {
        logger.verbose(`좋아..${cafeteria.id}번 Cafeteria..변신!`);

    }

    async deleteCafeteria(cafeteriaId: number): Promise<void> {
        logger.verbose(`오마에...${cafeteriaId}번 Cafeteria를 지우라고 한거냐!?! 크흑...어쩔 수 없군..`);
    }
}

const cafeteriaRepository = new CafeteriaRepository();

export default cafeteriaRepository;
