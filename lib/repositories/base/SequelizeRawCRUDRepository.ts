import sequelize from '../../db/sequelize';
import {Model, Repository} from 'sequelize-typescript';
import logger from '../../utils/logger';
import {FindOptions} from 'sequelize';

abstract class SequelizeRawCRUDRepository<M extends Model> {
  private repo: Repository<M>;
  private modelClass: {new (): M};
  private modelName: string;
  private primaryKeyName: string;

  protected constructor(modelClass: {new (): M}, primaryKeyName: string = 'id') {
    this.repo = sequelize.getRepository(modelClass);

    this.modelClass = modelClass;
    this.modelName = this.modelClass.name;

    this.primaryKeyName = primaryKeyName;

    logger.verbose(`5252 이봐 ${this.modelName}! 네놈 repo는 내가 처리하지!`);
  }

  protected async create(entity: object): Promise<number> {
    logger.verbose(
      `받아들여라,,, ${this.modelName} ${JSON.stringify(entity)}.., 새로운 가조쿠다!!`
    );

    // Create will be performed only when no row with the primary key exists.
    // Otherwise it will throw.
    try {
      await this.repo.create(entity);
    } catch (e) {
      logger.error(e.message);
      logger.verbose(`으윽..., 새로운 ${this.modelName}을(를) 맞이할 수 없었다!`);

      return 0;
    }

    logger.verbose(`좋아, 새로운 ${this.modelName}을(를) 환영한다!`);

    return 1;
  }

  protected async read(id: number): Promise<M | null> {
    logger.verbose(`${id}번 ${this.modelName}을(를) 가져오라구? 킄.. 좋아 원하는대로 해주지`);

    const seqResult = await this.repo.findByPk(id);

    if (!seqResult) {
      logger.verbose(`그치만....${id}번 ${this.modelName}같은 건 존재하지 않는걸!!!`);
      return null;
    }

    // @ts-ignore
    return seqResult;
  }

  protected async readAll(options?: FindOptions): Promise<Array<M>> {
    logger.verbose(`${this.modelName}를 다 가져오라구? 킄.. 좋아 원하는대로 해주지`);

    const result = await this.repo.findAll(options);
    logger.verbose(`무려 ${result.length}개나 겟또다제☆ 이제서야 만족스러운거냐구!`);

    return result;
  }

  protected async readRecent(limit?: number) {
    return await this.readAll({
      order: [[this.primaryKeyName, 'DESC']],
      limit: limit,
    });
  }

  protected async update(entity: object): Promise<number> {
    logger.verbose(`좋아..${this.modelName}..변신!`);

    // @ts-ignore
    const options = this.getWhereClauseOptionSpecifyingPk(entity[this.primaryKeyName]);

    // Update will be performed only when row exists,
    // otherwise, nothing will happen (not throw).
    const [numberOfAffectedRows] = await this.repo.update(entity, options);

    logger.verbose(`${numberOfAffectedRows}개의 ${this.modelName}, 변신 완료!!!`);

    return numberOfAffectedRows;
  }

  protected async delete(id: number): Promise<number> {
    logger.verbose(
      `오마에...${id}번 ${this.modelName}을(를) 지우라고 한거냐!?! 크흑...어쩔 수 없군..`
    );

    const options = this.getWhereClauseOptionSpecifyingPk(id);

    // Delete will be performed only when row exists,
    // otherwise, nothing will happen (not throw).
    const numberOfAffectedRows = await this.repo.destroy(options);

    logger.verbose(`${numberOfAffectedRows}개의 ${this.modelName}이(가) 비트가 되어 흩어졌다...`);

    return numberOfAffectedRows;
  }

  private getWhereClauseOptionSpecifyingPk(id: any) {
    const clause = {};
    // @ts-ignore
    clause[this.primaryKeyName] = id;

    return {where: clause};
  }
}

export default SequelizeRawCRUDRepository;
