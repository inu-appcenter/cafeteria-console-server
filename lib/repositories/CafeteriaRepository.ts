import {Sequelize} from "sequelize-typescript";
import Cafeteria from "../db/models/Cafeteria";

class CafeteriaRepository {

    db: Sequelize;

    constructor(db: Sequelize) {
        this.db = db;
    }

    async getAllCafeteria() {

    }

    async updateCafeteria(cafeteria: Cafeteria) {

    }

    async deleteCafeteria(cafeteriaId: number) {

    }
}
