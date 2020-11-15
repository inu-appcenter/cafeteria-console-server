import CafeteriaModel from "../../db/models/CafeteriaModel";
import sequelize from "../../db/sequelize";
import {Model, Repository} from "sequelize-typescript";
import logger from "../../utils/logger";
import {parseObject, serializeObject} from "../../utils/object";
import {camelToSnake, snakeToCamel} from "../../utils/naming";
import IEntity from "../../entities/base/IEntity";

abstract class SequelizeCRUDRepository<E extends IEntity<E>, M extends Model> {
    private repo: Repository<M>
    private readonly entityName: string
    private readonly entityClass: { new(): E };
    private modelClass: { new(): M };
    private primaryKeyName: string

    protected constructor(entityClass: {new(): E}, modelClass: {new(): M}, primaryKeyName: string = 'id') {
        this.repo = sequelize.getRepository(modelClass);
        this.entityName = entityClass.name;

        this.entityClass = entityClass;
        this.modelClass = modelClass;

        this.primaryKeyName = primaryKeyName;

        logger.verbose(`5252 이봐 ${this.entityName}! 네놈 repo는 내가 처리하지!`);
    }

    protected async create(entity: E): Promise<number> {
        logger.verbose(`받아들여라,,, ${entity.id}번 ${this.entityName}.., 새로운 가조쿠다!!`);

        const values = serializeObject(entity, camelToSnake);
        // Create will be performed only when no row with the primary key exists.
        // Otherwise it will throw.
        try {
            await this.repo.create(values);
        } catch (e) {
            logger.error(e.message);
            logger.verbose(`으윽..., 새로운 ${this.entityName}을(를) 맞이할 수 없었다!`);

            return 0;
        }

        logger.verbose(`좋아, 새로운 ${this.entityName}을(를) 환영한다!`);

        return 1;
    }

    protected async read(id: number): Promise<E|null> {
        logger.verbose(`${id}번 ${this.entityName}을(를) 가져오라구? 킄.. 좋아 원하는대로 해주지`);

        const seqResult = await this.repo.findByPk(id);

        if (!seqResult) {
            logger.verbose(`그치만....${id}번 ${this.entityName}같은 건 존재하지 않는걸!!!`);
            return null;
        }

        return parseObject(seqResult.dataValues, snakeToCamel, this.entityClass);
    }

    protected async readAll(): Promise<Array<E>> {
        logger.verbose(`${this.entityName}를 다 가져오라구? 킄.. 좋아 원하는대로 해주지`);

        const result = await this.repo.findAll()
            .map((seq: any) => seq.dataValues)
            .map((values: any) => parseObject(values, snakeToCamel, this.entityClass));

        logger.verbose(`무려 ${result.length}개나 겟또다제☆ 이제서야 만족스러운거냐구!`);

        return result;
    }

    protected async update(entity: E, ignoredFields: Array<keyof E>|null = null): Promise<number> {
        logger.verbose(`좋아..${this.entityName}..변신!`);

        const values = serializeObject(entity, camelToSnake, ignoredFields);
        const options = this.getWhereClauseOptionSpecifyingPk(entity.id);

        // Update will be performed only when row exists,
        // otherwise, nothing will happen (not throw).
        const [numberOfAffectedRows] = await this.repo.update(values, options);

        logger.verbose(`${numberOfAffectedRows}개의 ${this.entityName}, 변신 완료!!!`);

        return numberOfAffectedRows;
    }

    protected async delete(id: number): Promise<number> {
        logger.verbose(`오마에...${id}번 ${this.entityName}을(를) 지우라고 한거냐!?! 크흑...어쩔 수 없군..`);

        const options = this.getWhereClauseOptionSpecifyingPk(id);

        // Delete will be performed only when row exists,
        // otherwise, nothing will happen (not throw).
        const numberOfAffectedRows = await this.repo.destroy(options);

        logger.verbose(`${numberOfAffectedRows}개의 ${this.entityName}이(가) 비트가 되어 흩어졌다...`);

        return numberOfAffectedRows;
    }

    private getWhereClauseOptionSpecifyingPk(id: number) {
        const clause = {};
        // @ts-ignore
        clause[this.primaryKeyName] = id;

        return {where: clause};
    }
}

export default SequelizeCRUDRepository;
