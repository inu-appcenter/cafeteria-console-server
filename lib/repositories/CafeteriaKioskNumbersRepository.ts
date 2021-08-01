import SequelizeCRUDRepository from './base/SequelizeCRUDRepository';
import CafeteriaKioskNumbers from '../entities/CafeteriaKioskNumbers';
import CafeteriaKioskNumbersModel from '../db/models/CafeteriaKioskNumbersModel';

class CafeteriaKioskNumbersRepository extends SequelizeCRUDRepository<
  CafeteriaKioskNumbers,
  CafeteriaKioskNumbersModel
> {
  constructor() {
    super(CafeteriaKioskNumbers, CafeteriaKioskNumbersModel, 'cafeteria_id');
  }

  async getKioskNumber(cafeteriaId: number) {
    return await this.read(cafeteriaId);
  }

  async getAllKioskNumbers() {
    return await this.readAll();
  }

  async createKioskNumbers(kioskNumbers: CafeteriaKioskNumbers) {
    return await this.create(kioskNumbers);
  }

  async updateKioskNumbers(kioskNumbers: CafeteriaKioskNumbers) {
    return await this.update(kioskNumbers, ['cafeteriaId']);
  }

  async deleteKioskNumbers(cafeteriaId: number) {
    return await this.delete(cafeteriaId);
  }
}

const cafeteriaKioskNumbersRepository = new CafeteriaKioskNumbersRepository();

export default cafeteriaKioskNumbersRepository;
