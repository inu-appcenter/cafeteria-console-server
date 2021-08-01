import SequelizeCRUDRepository from './base/SequelizeCRUDRepository';
import CafeteriaComment from '../entities/CafeteriaComment';
import CafeteriaCommentModel from '../db/models/CafeteriaCommentModel';

class CafeteriaCommentRepository extends SequelizeCRUDRepository<
  CafeteriaComment,
  CafeteriaCommentModel
> {
  constructor() {
    super(CafeteriaComment, CafeteriaCommentModel, 'cafeteria_id');
  }

  async getCafeteriaComment(cafeteriaId: number) {
    return await this.read(cafeteriaId);
  }

  async getAllCafeteriaComments() {
    return await this.readAll();
  }

  async createCafeteriaComment(comment: CafeteriaComment) {
    return await this.create(comment);
  }

  async updateCafeteriaComment(comment: CafeteriaComment) {
    return await this.update(comment, ['cafeteriaId']);
  }

  async deleteCafeteriaComment(cafeteriaId: number) {
    return await this.delete(cafeteriaId);
  }
}

const cafeteriaCommentRepository = new CafeteriaCommentRepository();

export default cafeteriaCommentRepository;
