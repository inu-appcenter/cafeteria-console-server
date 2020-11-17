import Cafeteria from "../entities/Cafeteria";
import CafeteriaModel from "../db/models/CafeteriaModel";
import SequelizeCRUDRepository from "./base/SequelizeCRUDRepository";

class CafeteriaRepository extends SequelizeCRUDRepository<Cafeteria, CafeteriaModel> {

    constructor() {
        super(Cafeteria, CafeteriaModel);
    }

    async addCafeteria(cafeteria: Cafeteria) {
        return this.create(cafeteria);
    }

    async getCafeteria(cafeteriaId: number) {
        return this.read(cafeteriaId);
    }

    async getAllCafeteria() {
        return this.readAll();
    }

    async updateCafeteria(cafeteria: Cafeteria) {
        return this.update(cafeteria, ['id', 'imagePath']);
    }

    async deleteCafeteria(cafeteriaId: number) {
        return this.delete(cafeteriaId);
    }
}

const cafeteriaRepository = new CafeteriaRepository();

export default cafeteriaRepository;
