import Corner from '../entities/Corner';
import CornerModel from '../db/models/CornerModel';
import SequelizeCRUDRepository from './base/SequelizeCRUDRepository';

class CornerRepository extends SequelizeCRUDRepository<Corner, CornerModel> {
  constructor() {
    super(Corner, CornerModel);
  }

  async addCorner(corner: Corner) {
    return this.create(corner);
  }

  async getCorner(cornerId: number) {
    return this.read(cornerId);
  }

  async getAllCorners() {
    return this.readAll();
  }

  async updateCorner(corner: Corner) {
    return this.update(corner, ['id']);
  }

  async deleteCorner(cornerId: number) {
    return this.delete(cornerId);
  }
}

const cornerRepository = new CornerRepository();

export default cornerRepository;
